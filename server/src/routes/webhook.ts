// src/routes/webhook.ts
import axios from "axios";
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// ---------- Helpers ----------
function normText(s: string | undefined | null) {
  return (s ?? "").toLowerCase();
}

function matchesKeywords(text: string, anyKeyword: boolean, keywords: string[]): boolean {
  const t = normText(text);
  if (anyKeyword) return t.trim().length > 0; // treat "any" as any non-empty comment
  if (!keywords || keywords.length === 0) return false;

  // simple ANY match (contains); you can switch to token-based or regex later
  return keywords.some(k => t.includes(k.toLowerCase()));
}

function buildMessagePayload(automation: any, username?: string) {
  console.log("automation :", automation);

  // If you want to send cards/buttons/image -> use a template payload.
  // If you just want text -> use { message: { text: ... } }
  const hasLinks = Array.isArray(automation.dmLinks) && automation.dmLinks.length > 0;

  if (hasLinks || automation.dmImageUrl) {
    const elements: any[] = [];

    // Optionally include an image "card"
    if (automation.dmImageUrl) {
      elements.push({
        title: automation.msgTitle ?? "Info",
        subtitle: automation.dmText ? `${automation.dmText} || Powered by fuma.dotdazzle.in` : "",
        image_url: automation.dmImageUrl,
        buttons: (automation.dmLinks ?? []).slice(0, 3).map((l: any) => ({
          type: "web_url",
          url: `${process.env.BACKEND_URL}/api/v1/automation/track/${automation.id}?to=${l.url}`,
          title: l.title?.slice(0, 20) || "Open",
        })),
      });
    } else {
      // A card without image
      elements.push({
        title: automation.msgTitle ?? "Info",
        subtitle: automation.dmText ? `${automation.dmText} || Powered by fuma.dotdazzle.in` : "",
        buttons: (automation.dmLinks ?? []).slice(0, 3).map((l: any) => ({
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
  const text =
    (automation.dmText as string) ||
    (username ? `Thanks @${username}!` : "Thanks for commenting!");

  return { message: { text } };
}

async function sendPrivateReplyToComment(
  commentId: string,
  payload: any,
  pageAccessToken: string
) {
  // IMPORTANT: use facebook.com host, not instagram.com
  const url = `https://graph.instagram.com/v21.0/me/messages`;
  const headers = {
    Authorization: `Bearer ${pageAccessToken}`, // user's Page Access Token
    "Content-Type": "application/json",
  };

  const body = { recipient: { comment_id: commentId }, ...payload };
  const { data } = await axios.post(url, body, { headers });
  return data;
}

function buildOpeningReplyButtonPayload(automation: any) {
  const text =
    automation?.openingMsgData?.text ??
    "Hey there! Thanks for your interest ✨ Tap below and I’ll send you the link in a sec.";

  // Button sends a postback we’ll catch in the webhook
  return {
    message: text,
    ctaTitle: automation?.openingMsgData?.ctaTitle || "Send me the link",
    postbackPayload: `SEND_LINK:${automation.id}`,
  };
}

async function replyToComment(
  commentId: string,
  message: string,
  pageAccessToken: string
) {
  // Public reply to the IG comment
  const url = `https://graph.instagram.com/v21.0/${commentId}/replies`;
  await axios.post(
    url,
    { message },
    { params: { access_token: pageAccessToken } }
  );
}


// Safely pull mediaId and the IG business account ID out of the webhook.
// Webhook shapes vary; keep fallbacks.
function extractIdsFromWebhook(value: any) {
  const commentId = value?.id ?? value?.comment_id ?? null;
  const username = value?.from?.username ?? undefined;
  const text = value?.text ?? value?.message ?? "";

  // Try to detect the media id that was commented on:
  const mediaId =
    value?.media?.id ??
    value?.media_id ??
    value?.parent_id ?? // sometimes appears
    null;

  // IG business/user id that owns the media (depends on your subscribed fields and app setup)
  const igBusinessId =
    value?.owner_id ??
    value?.media?.owner?.id ??
    value?.instagram_user_id ??
    null;

  return { commentId, username, text, mediaId, igBusinessId };
}

async function sendDMToUser(recipientId: string, payload: any, pageAccessToken: string) {
  // Message to a user id (used after postback)
  const url = `https://graph.instagram.com/v21.0/me/messages`;
  const headers = {
    Authorization: `Bearer ${pageAccessToken}`,
    "Content-Type": "application/json",
  };
  const body = { recipient: { id: recipientId }, ...payload };
  const { data } = await axios.post(url, body, { headers });
  return data;
}

// Try to detect a Messenger/IG messaging postback
function extractPostback(body: any) {
  // Page/IG messaging webhooks often under entry[].messaging[]
  const entry = body?.entry?.[0];
  const messaging = entry?.messaging?.[0];
  const postbackPayload = messaging?.postback?.payload as string | undefined;
  const senderId = messaging?.sender?.id as string | undefined;
  return { postbackPayload, senderId };
}

// ---------- Main webhook ----------
export const webhook = async (req: Request, res: Response) => {
  if (req.method === "POST") {
    let body: any;
    try {
      if (Buffer.isBuffer(req.body)) body = JSON.parse(req.body.toString("utf8"));
      else if (typeof req.body === "string") body = JSON.parse(req.body);
      else body = req.body;
    } catch (err) {
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
          const auto = await prisma.automation.findUnique({
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
      const automations = await prisma.automation.findMany({
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
        if (!hit) continue;

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
            const replyText = auto?.commentReplyData?.[randomIdx]?.reply
            await replyToComment(commentId, replyText, pageAccessToken);
          }


          // 1) FOLLOW-FOR-DM GATE
          if (auto.followForDM) {
            const visitTitle =  "Visit Profile";
            const confirmTitle =  "I'm following ✅";
            const followText = "Oh no! It seems you're not following me yet. Tap 'Visit Profile', follow, then press 'I'm following ✅' to get the link ✨.";

            // Try to build a profile URL
            const profileUrl = `https://instagram.com/${auto.user.username}`

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

          // 2) OPENING MESSAGE (ONLY if follow gate is not enabled)
          if (auto.openingMsg) {
            const openingPayload = {
              message: {
                attachment: {
                  type: "template",
                  payload: {
                    template_type: "button",
                    text:  "Hey there! 👋 Thanks for your comment. Tap below and I’ll send you the link!",
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
        } catch (err: any) {
          console.error("Reply/DM failed:", err?.response?.data || err);
        }
      }
    } catch (e: any) {
      console.error("Failed to handle webhook:", e?.response?.data || e);
    }

    // Always 200 quickly so Meta stops retrying
    return res.status(200).send("ok");
  }

  if (req.method === "GET") {
    const challenge = req.query["hub.challenge"];
    if (challenge) return res.status(200).send(String(challenge));
    return res.status(200).send("ok");
  }

  return res.sendStatus(405);
};
