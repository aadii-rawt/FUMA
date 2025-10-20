"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhook = void 0;
const axios_1 = __importDefault(require("axios"));
const webhook = async (req, res) => {
    if (req.method === "POST") {
        let body = null;
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
            body = { parseError: String(err) };
        }
        // Log in the clean shape you want
        console.dir(body, { depth: null });
        try {
            // Extract first change (adjust if you expect batches)
            const entry = body?.entry?.[0];
            const change = entry?.changes?.[0];
            const value = change?.value;
            const commentId = value?.id; // e.g. "17962854512991905"
            const userId = value?.from?.id; // e.g. "1961954667675006"
            const username = value?.from?.username; // e.g. "sahill_rathore"
            const text = value?.text; // the comment text
            console.log("commentId:", commentId, "userId:", userId, "username:", username, "text:", text);
            // Send a private reply to the comment (allowed within 7 days)
            if (commentId) {
                const resp = await sendPrivateReplyToComment(commentId, `Thanks @${username}! 🙌`);
                console.log("Reply sent:", resp);
            }
            else {
                console.warn("No commentId found; skipping reply.");
            }
        }
        catch (e) {
            console.error("Failed to handle webhook:", e?.response?.data || e);
        }
        // Always 200 quickly so Meta stops retrying
        return res.status(200).send("<p>This is POST Request, Hello Webhook!</p>");
    }
    if (req.method === "GET") {
        const challenge = req.query["hub.challenge"];
        if (challenge)
            return res.status(200).send(String(challenge));
        return res.status(200).send("<p>This is GET Request, Hello Webhook!</p>");
    }
    return res.sendStatus(405);
};
exports.webhook = webhook;
async function sendPrivateReplyToComment(commentId, text) {
    const url = `https://graph.instagram.com/v21.0/me/messages`;
    const headers = {
        "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
    };
    const body = {
        recipient: { comment_id: commentId }, // private reply to comment (7-day window)
        message: {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": "Sign up for our weekly newsletter",
                            "subtitle": "Our weekly newsletter is filled with deals and extra content!",
                            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL0dX2mYasalv-6Tc7v8Rc8wk7qZUQMPIihA&s",
                            "buttons": [
                                {
                                    "type": "web_url",
                                    "url": "https://your-site.example.com/newsletter",
                                    "title": "Sign up here"
                                }
                            ]
                        },
                        {
                            "title": "Visit our store",
                            "subtitle": "New arrivals and exclusive drops.",
                            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYmq6pdaSk0nSf-dkI32OzWkVWKDSQHKxdRA&s",
                            "buttons": [
                                {
                                    "type": "web_url",
                                    "url": "https://your-site.example.com/store",
                                    "title": "Shop now"
                                }
                            ]
                        }
                    ]
                }
            }
        },
    };
    const { data } = await axios_1.default.post(url, body, { headers });
    return data;
}
//# sourceMappingURL=webhook.js.map