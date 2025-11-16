// src/routes/webhook.ts
import axios from "axios";
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { messageVaidator, saveContact, sendCount } from "../utils/utils";

// ---------- Helpers ----------
function normText(s: string | undefined | null) {
  return (s ?? "").toLowerCase();
}

function matchesKeywords(text: string, anyKeyword: boolean, keywords: string[]): boolean {
  const t = normText(text);
  if (anyKeyword) return t.trim().length > 0;
  if (!keywords || keywords.length === 0) return false;
  return keywords.some(k => t.includes(k.toLowerCase()));
}


function buildMessagePayload(automation: any, username?: string) {
  const hasLinks = Array.isArray(automation.dmLinks) && automation.dmLinks.length > 0;

  if (hasLinks || automation.dmImageUrl) {
    const elements: any[] = [];

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

  const url = `${process.env.INSTA_API}/me/messages`;
  const headers = {
    Authorization: `Bearer ${pageAccessToken}`,
    "Content-Type": "application/json",
  };

  const body = { recipient: { comment_id: commentId }, ...payload };
  const { data } = await axios.post(url, body, { headers });
  return data;
}

async function replyToComment(
  commentId: string,
  message: string,
  pageAccessToken: string
) {

  const url = `${process.env.INSTA_API}/${commentId}/replies`;
  await axios.post(
    url,
    { message },
    { params: { access_token: pageAccessToken } }
  );
}

function extractIdsFromWebhook(value: any) {
  const commentId = value?.id ?? value?.comment_id ?? null;
  const username = value?.from?.username ?? undefined;
  const text = value?.text ?? value?.message ?? "";

  const mediaId =
    value?.media?.id ??
    value?.media_id ??
    value?.parent_id ??
    null;

  const igBusinessId =
    value?.owner_id ??
    value?.media?.owner?.id ??
    value?.instagram_user_id ??
    null;

  return { commentId, username, text, mediaId, igBusinessId };
}

async function sendDMToUser(recipientId: string, payload: any, pageAccessToken: string) {
  // Message to a user id (used after postback)
  const url = `${process.env.INSTA_API}/me/messages`;
  const headers = {
    Authorization: `Bearer ${pageAccessToken}`,
    "Content-Type": "application/json",
  };
  const body = { recipient: { id: recipientId }, ...payload };
  const { data } = await axios.post(url, body, { headers });
  return data;
}

function extractPostback(body: any) {
  const entry = body?.entry?.[0];
  const messaging = entry?.messaging?.[0];
  const postbackPayload = messaging?.postback?.payload as string | undefined;
  const senderId = messaging?.sender?.id as string | undefined;
  return { postbackPayload, senderId };
}


function sendFollowUoMessage(auto) {



}

// ---------- -------------- webhook ---------- ------------------------
export const webhook = async (req: Request, res: Response) => {
  console.log("webhook called");
  
  if (req.method === "POST") {
    let body: any;
    try {
      if (Buffer.isBuffer(req.body)) body = JSON.parse(req.body.toString("utf8"));
      else if (typeof req.body === "string") body = JSON.parse(req.body);
      else body = req.body;
    } catch (err) {
      console.error("Parse error:", err);
      return res.status(200).send("ok");
    }

    try {


      const { postbackPayload, senderId } = extractPostback(body);
      if (postbackPayload && senderId) {
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

      const { commentId, username, text, mediaId } = extractIdsFromWebhook(value);

      if (!commentId || !mediaId) {
        console.warn("No commentId or mediaId in webhook; skipping.");
        return res.status(200).send("ok");
      }

      // ------ finding automation for this  media
      const automations = await prisma.automation.findMany({
        where: { status: "LIVE", postMediaId: mediaId },
        include: { user: true },
      });

      if (!automations.length) {
        console.log("No LIVE automation for this media; skipping.");
        return res.status(200).send("ok");
      }

      // -------------- checking the matching keyword for automation
      for (const auto of automations) {
        const hit = matchesKeywords(text, auto.anyKeyword, auto.keywords ?? []);
        if (!hit) continue;

        const pageAccessToken = auto.user?.access_token;
        if (!pageAccessToken) {
          console.warn(`No page token for user ${auto.userId}; cannot send DM`);
          continue;
        }

        try {
          // ------------ reply of comment if enable
          if (auto.commentReply) {
            const randomIdx = Math.floor(Math.random() * 3);
            const replyText = auto?.commentReplyData?.[randomIdx]?.reply
            await replyToComment(commentId, replyText, pageAccessToken);
          }

          // message validator for free plan
          if (auto.user.plan == "FREE") {
            const messageAvailable = await messageVaidator(auto?.user)
            if (!messageAvailable) {
              console.log("Message limit exceed for free plan");
              return
            }
          }

          // ------- checking if user follow or not
          
          if (auto.followForDM) {
            if(auto.user.plan == "FREE") return // feature not available for free user

            const visitTitle = "Visit Profile";
            const confirmTitle = "I'm following ✅";
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

          // sening opening message if enable
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

          // ------- sendibg message
          const payload = buildMessagePayload(auto, username);
          await sendPrivateReplyToComment(commentId, payload, pageAccessToken);
          const user = auto?.user
          await sendCount(auto.id)
          if (user.plan == "ULTIMATE") {
            await saveContact(username, user)
          }

          if (auto.followUp) {
            if (user.plan != "ULTIMATE") return // feature not available for free and pro user
            const openingPayload = {
              message: {
                attachment: {
                  type: "template",
                  payload: {
                    template_type: "button",
                    // @ts-ignore
                    text: auto.followUpData.text || "Hey there! 👋 Thanks for your comment. Tap below and I’ll send you the link!",
                    // @ts-ignore
                    buttons: (auto.followUpData.dmLinks ?? []).slice(0, 3).map((l: any) => ({
                      type: "web_url",
                      url: l.url || "",
                      title: l.text?.slice(0, 20) || "Open",
                    })),
                  },
                },
              },
            };
            await sendPrivateReplyToComment(commentId, openingPayload, pageAccessToken);

          }

          break;
        } catch (err: any) {
          console.error("Reply/DM failed:", err?.response?.data || err);
        }
      }
    } catch (e: any) {
      console.error("Failed to handle webhook:", e?.response?.data || e);
    }

    return res.status(200).send("ok");
  }

  if (req.method === "GET") {
    const challenge = req.query["hub.challenge"];
    if (challenge) return res.status(200).send(String(challenge));
    return res.status(200).send("ok");
  }

  return res.sendStatus(405);
};
