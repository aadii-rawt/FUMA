"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const instaRouter = (0, express_1.Router)();
const axios_1 = __importDefault(require("axios"));
const prisma_1 = require("../lib/prisma");
const IG_OAUTH_DIALOG = "https://www.instagram.com/oauth/authorize";
const CLIENT_ID = process.env.META_APP_ID;
const CLIENT_SECRET = process.env.META_APP_SECRET;
const REDIRECT_URI = process.env.OAUTH_REDIRECT_URI;
const SCOPES = [
    "instagram_business_basic",
    "instagram_business_content_publish",
    "instagram_business_manage_messages",
    "instagram_business_manage_comments",
].join(",");
instaRouter.get("/connect", (req, res) => {
    const url = new URL(IG_OAUTH_DIALOG);
    url.search = new URLSearchParams({
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: "code",
        scope: SCOPES
    }).toString();
    console.log("reached.");
    return res.redirect(302, url.toString());
});
instaRouter.get("/callback", async (req, res) => {
    try {
        const { code } = req.query;
        if (!code)
            return res.status(400).send("Missing code");
        // generate token    
        const tokenResp = await axios_1.default.post("https://api.instagram.com/oauth/access_token", new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: "authorization_code",
            redirect_uri: REDIRECT_URI,
            code,
        }).toString(), {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        const { access_token } = tokenResp.data;
        //long-lived token
        const llResp = await axios_1.default.get("https://graph.instagram.com/access_token", {
            params: {
                grant_type: "ig_exchange_token",
                client_secret: CLIENT_SECRET,
                access_token: access_token,
            },
        });
        // account details
        const longLivedToken = llResp.data.access_token;
        const fields = "id,user_id,username,name,profile_picture_url";
        const user = await axios_1.default.get("https://graph.instagram.com/v21.0/me", {
            params: {
                fields: fields,
                access_token: longLivedToken
            }
        });
        console.log("user data :", user.data);
        console.log("long lived token : ", longLivedToken);
        await prisma_1.prisma.users.update({
            where: { id: "cmgqsrrhh0001ydpo3317qyw8" },
            //@ts-ignore
            data: {
                access_token: longLivedToken,
                // @ts-ignore
                username: user.data.username,
                // @ts-ignore
                avatar: user.data.profile_picture_url
            },
        });
        const ui = new URL(`${process.env.CORS_ORIGIN}/app`);
        return res.redirect(ui.toString());
    }
    catch (e) {
        console.error("OAuth callback error:", e?.response?.data || e.message);
        return res.redirect(`${process.env.CORS_ORIGIN}/auth/connect/instagram`);
    }
});
exports.default = instaRouter;
//# sourceMappingURL=instagram.js.map