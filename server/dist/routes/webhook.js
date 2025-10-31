"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhook = void 0;
// src/routes/webhook.ts
const axios_1 = __importDefault(require("axios"));
const prisma_1 = require("../lib/prisma");
// ---------- Helpers ----------
function normText(s) {
    return (s ?? "").toLowerCase();
}
function matchesKeywords(text, anyKeyword, keywords) {
    const t = normText(text);
    if (anyKeyword)
        return t.trim().length > 0; // treat "any" as any non-empty comment
    if (!keywords || keywords.length === 0)
        return false;
    // simple ANY match (contains); you can switch to token-based or regex later
    return keywords.some(k => t.includes(k.toLowerCase()));
}
function buildMessagePayload(automation, username) {
    console.log("automation :", automation);
    // If you want to send cards/buttons/image -> use a template payload.
    // If you just want text -> use { message: { text: ... } }
    const hasLinks = Array.isArray(automation.dmLinks) && automation.dmLinks.length > 0;
    if (hasLinks || automation.dmImageUrl) {
        const elements = [];
        // Optionally include an image "card"
        if (automation.dmImageUrl) {
            elements.push({
                title: automation.msgTitle ?? "Info",
                subtitle: automation.dmText ? `${automation.dmText} || Powered by fuma.dotdazzle.in` : "",
                image_url: automation.dmImageUrl,
                buttons: (automation.dmLinks ?? []).slice(0, 3).map((l) => ({
                    type: "web_url",
                    url: `${process.env.BACKEND_URL}/api/v1/automation/track/${automation.id}?to=${l.url}`,
                    title: l.title?.slice(0, 20) || "Open",
                })),
            });
        }
        else {
            // A card without image
            elements.push({
                title: automation.msgTitle ?? "Info",
                subtitle: automation.dmText ? `${automation.dmText} || Powered by fuma.dotdazzle.in` : "",
                buttons: (automation.dmLinks ?? []).slice(0, 3).map((l) => ({
                    type: "web_url",
                    url: l.url,
                    title: l.title?.slice(0, 20) || "Open",
                })),
            });
        }
        return {
            message: {
                attachment: {
                    type: "template",
                    payload: { template_type: "generic", elements },
                },
            },
        };
    }
    // Plain text fallback
    const text = automation.dmText ||
        (username ? `Thanks @${username}!` : "Thanks for commenting!");
    return { message: { text } };
}
async function sendPrivateReplyToComment(commentId, payload, pageAccessToken) {
    // IMPORTANT: use facebook.com host, not instagram.com
    const url = `https://graph.instagram.com/v21.0/me/messages`;
    const headers = {
        Authorization: `Bearer ${pageAccessToken}`, // user's Page Access Token
        "Content-Type": "application/json",
    };
    const body = { recipient: { comment_id: commentId }, ...payload };
    const { data } = await axios_1.default.post(url, body, { headers });
    return data;
}
function buildOpeningReplyButtonPayload(automation) {
    const text = automation?.openingMsgData?.text ??
        "Hey there! Thanks for your interest ✨ Tap below and I’ll send you the link in a sec.";
    // Button sends a postback we’ll catch in the webhook
    return {
        message: text,
        ctaTitle: automation?.openingMsgData?.ctaTitle || "Send me the link",
        postbackPayload: `SEND_LINK:${automation.id}`,
    };
}
async function checkIfCommenterFollowsBusiness(commenterUsername, igBusinessId, pageAccessToken) {
    // WARNING: Checking a specific user's follow status (relationship check) on Instagram via the Graph API 
    // is often brittle, complex, and heavily rate-limited. It typically requires two steps:
    // 1. Resolving the commenter's IG User ID from their username.
    // 2. Using an endpoint like GET /{ig-business-id}/followed_by?user_id={commenter-id} to check the relationship.
    // For simplicity and to integrate into your existing structure, we are using a simplified, direct check
    // that assumes the necessary permissions (like business_management) and configuration. 
    // You may need to refine this API call based on your exact Meta App permissions and features.
    try {
        // This is a placeholder for the actual complex API call to check the relationship.
        // There is no official single-step public endpoint for "Is this user following me?" by username.
        // For demonstration, we'll try to resolve the commenter's ID via Business Discovery, which 
        // implies the commenter is visible and searchable by the business account.
        const discoveryUrl = `https://graph.instagram.com/v21.0/${igBusinessId}`;
        const discoveryParams = {
            // Fields needed to resolve the relationship if an explicit endpoint is not available.
            fields: `business_discovery.username(${commenterUsername}){id}`,
            access_token: pageAccessToken
        };
        const { data: discoveryData } = await axios_1.default.get(discoveryUrl, { params: discoveryParams });
        const commenterIgId = discoveryData?.business_discovery?.id;
        if (!commenterIgId) {
            // If the username cannot be resolved (e.g., private profile, username doesn't exist), assume false
            return false;
        }
        // --- Step 2: Attempt a Relationship Check (Requires specific Business Permissions) ---
        // A hypothetical, direct relationship check endpoint.
        const checkUrl = `https://graph.instagram.com/v21.0/${igBusinessId}/is_followed_by`;
        const checkParams = {
            target_id: commenterIgId, // ID of the user whose relationship to check
            access_token: pageAccessToken
        };
        const { data: checkData } = await axios_1.default.get(checkUrl, { params: checkParams });
        // Assuming the response structure returns 'is_followed' for the relationship.
        return checkData?.is_followed ?? false;
    }
    catch (e) {
        // Log errors, but return false to enforce the Follow Gate on failure (fail-safe).
        console.warn(`[Follow Check] Failed for ${commenterUsername}. Enforcing gate. Error:`, e?.response?.data || e.message);
        return false;
    }
}
async function replyToComment(commentId, message, pageAccessToken) {
    // Public reply to the IG comment
    const url = `https://graph.instagram.com/v21.0/${commentId}/replies`;
    await axios_1.default.post(url, { message }, { params: { access_token: pageAccessToken } });
}
// Safely pull mediaId and the IG business account ID out of the webhook.
// Webhook shapes vary; keep fallbacks.
function extractIdsFromWebhook(value) {
    const commentId = value?.id ?? value?.comment_id ?? null;
    const username = value?.from?.username ?? undefined;
    const text = value?.text ?? value?.message ?? "";
    // Try to detect the media id that was commented on:
    const mediaId = value?.media?.id ??
        value?.media_id ??
        value?.parent_id ?? // sometimes appears
        null;
    // IG business/user id that owns the media (depends on your subscribed fields and app setup)
    const igBusinessId = value?.owner_id ??
        value?.media?.owner?.id ??
        value?.instagram_user_id ??
        null;
    return { commentId, username, text, mediaId, igBusinessId };
}
async function sendDMToUser(recipientId, payload, pageAccessToken) {
    // Message to a user id (used after postback)
    const url = `https://graph.instagram.com/v21.0/me/messages`;
    const headers = {
        Authorization: `Bearer ${pageAccessToken}`,
        "Content-Type": "application/json",
    };
    const body = { recipient: { id: recipientId }, ...payload };
    const { data } = await axios_1.default.post(url, body, { headers });
    return data;
}
// Try to detect a Messenger/IG messaging postback
function extractPostback(body) {
    // Page/IG messaging webhooks often under entry[].messaging[]
    const entry = body?.entry?.[0];
    const messaging = entry?.messaging?.[0];
    const postbackPayload = messaging?.postback?.payload;
    const senderId = messaging?.sender?.id;
    return { postbackPayload, senderId };
}
// ---------- Main webhook ----------
const webhook = async (req, res) => {
    if (req.method === "POST") {
        let body;
        try {
            if (Buffer.isBuffer(req.body))
                body = JSON.parse(req.body.toString("utf8"));
            else if (typeof req.body === "string")
                body = JSON.parse(req.body);
            else
                body = req.body;
        }
        catch (err) {
            console.error("Parse error:", err);
            return res.status(200).send("ok"); // still 200 to stop retries
        }
        try {
            // inside export const webhook = async (req, res) => { ... } just after parsing 'body'
            const { postbackPayload, senderId } = extractPostback(body);
            if (postbackPayload && senderId) {
                // FOLLOW gate and "send link" gate both land here
                if (postbackPayload.startsWith("FOLLOWED:") || postbackPayload.startsWith("SEND_LINK:")) {
                    const automationId = postbackPayload.split(":")[1];
                    const auto = await prisma_1.prisma.automation.findUnique({
                        where: { id: automationId },
                        include: { user: true },
                    });
                    if (!auto || !auto.user?.access_token) {
                        console.warn("Postback: automation or page token missing");
                        return res.status(200).send("ok");
                    }
                    const pageAccessToken = auto.user.access_token;
                    // After user confirms follow (or presses "Send me the link") -> send the link/card
                    const linkPayload = buildMessagePayload(auto, undefined);
                    await sendDMToUser(senderId, linkPayload, pageAccessToken);
                    console.log("✅ Link sent after postback:", postbackPayload);
                }
                return res.status(200).send("ok");
            }
            const entry = body?.entry?.[0];
            const change = entry?.changes?.[0];
            const value = change?.value;
            const { commentId, username, text, mediaId, igBusinessId } = extractIdsFromWebhook(value);
            console.log({ commentId, username, text, mediaId, igBusinessId });
            // Must have a comment + media id to proceed
            if (!commentId || !mediaId) {
                console.warn("No commentId or mediaId in webhook; skipping.");
                return res.status(200).send("ok");
            }
            // 1) Find LIVE automations for this media
            const automations = await prisma_1.prisma.automation.findMany({
                where: { status: "LIVE", postMediaId: mediaId },
                include: { user: true }, // we need user's page token from users.access_token
            });
            if (!automations.length) {
                console.log("No LIVE automation for this media; skipping.");
                return res.status(200).send("ok");
            }
            // 2) For each automation, keyword-match
            for (const auto of automations) {
                const hit = matchesKeywords(text, auto.anyKeyword, auto.keywords ?? []);
                if (!hit)
                    continue;
                // 3) Get the correct Page Access Token
                // You said you store the token on users.access_token already.
                const pageAccessToken = auto.user?.access_token;
                if (!pageAccessToken) {
                    console.warn(`No page token for user ${auto.userId}; cannot send DM`);
                    continue;
                }
                // 4) Build message from automation
                const payload = buildMessagePayload(auto, username);
                // 5) Send private reply
                try {
                    // A) Public reply to the comment first
                    if (auto.commentReply) {
                        // const replies = auto.openingMsgData ?? [];
                        const randomIdx = Math.floor(Math.random() * 3);
                        // const replyText = randomIdx >= 0 ? replies[randomIdx]?.reply ?? "" : ""; 
                        const replyText = auto?.commentReplyData?.[randomIdx]?.reply;
                        await replyToComment(commentId, replyText, pageAccessToken);
                    }
                    let shouldSendDirectly = false;
                    if (auto.followForDM) {
                        const isFollowing = await checkIfCommenterFollowsBusiness(username, igBusinessId, pageAccessToken);
                        if (isFollowing) {
                            console.log(`User @${username} is already following. Proceeding directly.`);
                            shouldSendDirectly = true;
                        }
                        else {
                            console.log(`User @${username} is NOT following. Sending Follow Gate.`);
                            // 1) SEND FOLLOW-FOR-DM GATE
                            const visitTitle = "Visit Profile";
                            const confirmTitle = "I'm following ✅";
                            // Updated message to match the image content as closely as possible
                            const followText = "Oh no! It seems you're not following me 😟 It would really mean a lot if you visit my profile and hit the follow button 😊. Once you have done that, click on the 'I'm following' button below and you will get the link ✨.";
                            // Try to build a profile URL
                            const profileUrl = `https://instagram.com/${auto.user.username}`;
                            const followGatePayload = {
                                message: {
                                    attachment: {
                                        type: "template",
                                        payload: {
                                            template_type: "button",
                                            text: followText,
                                            buttons: [
                                                { type: "web_url", url: profileUrl, title: visitTitle },
                                                { type: "postback", title: confirmTitle, payload: `FOLLOWED:${auto.id}` },
                                            ],
                                        },
                                    },
                                },
                            };
                            await sendPrivateReplyToComment(commentId, followGatePayload, pageAccessToken);
                            console.log("✅ Follow gate sent; waiting for postback FOLLOWED:<id>");
                            break; // stop after first matching automation
                        }
                    }
                    else {
                        // followForDM is false, so we send directly or use opening message
                        shouldSendDirectly = true;
                    }
                    // 2) OPENING MESSAGE (ONLY if follow gate is not enabled)
                    if (auto.openingMsg) {
                        const openingPayload = {
                            message: {
                                attachment: {
                                    type: "template",
                                    payload: {
                                        template_type: "button",
                                        text: "Hey there! 👋 Thanks for your comment. Tap below and I’ll send you the link!",
                                        buttons: [
                                            {
                                                type: "postback",
                                                title: "Send me the link",
                                                payload: `SEND_LINK:${auto.id}`,
                                            },
                                        ],
                                    },
                                },
                            },
                        };
                        await sendPrivateReplyToComment(commentId, openingPayload, pageAccessToken);
                        console.log("✅ Opening message sent; waiting for postback SEND_LINK:<id>");
                        break;
                    }
                    // 3) DIRECT SEND (no follow gate, no opening message)
                    const payload = buildMessagePayload(auto, username);
                    await sendPrivateReplyToComment(commentId, payload, pageAccessToken);
                    console.log("✅ Direct link sent");
                    break;
                }
                catch (err) {
                    console.error("Reply/DM failed:", err?.response?.data || err);
                }
            }
        }
        catch (e) {
            console.error("Failed to handle webhook:", e?.response?.data || e);
        }
        // Always 200 quickly so Meta stops retrying
        return res.status(200).send("ok");
    }
    if (req.method === "GET") {
        const challenge = req.query["hub.challenge"];
        if (challenge)
            return res.status(200).send(String(challenge));
        return res.status(200).send("ok");
    }
    return res.sendStatus(405);
};
exports.webhook = webhook;
//# sourceMappingURL=webhook.js.map