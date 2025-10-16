import {Request, Response, Router} from "express"
const instaRouter = Router()
import crypto from "crypto";
import axios from "axios";
import { log } from "console";
import { prisma } from "../lib/prisma";


const FB_OAUTH_DIALOG = "https://www.instagram.com/oauth/authorize";

const CLIENT_ID = process.env.META_APP_ID!;
const CLIENT_SECRET = process.env.META_APP_SECRET!;
const REDIRECT_URI = process.env.OAUTH_REDIRECT_URI!;

// the scopes you asked for (comma- or space-separated)
const SCOPES = [
  "instagram_business_basic",
  "instagram_business_content_publish",
  "instagram_business_manage_messages",
  "instagram_business_manage_comments",
].join(",");

instaRouter.get("/connect", (req: Request, res: Response) => {
    const state = crypto.randomBytes(16).toString("hex");
  // store in cookie/session to verify later
  res.cookie("oauth_state", state, { httpOnly: true, sameSite: "lax", secure: true });

  const url = new URL(FB_OAUTH_DIALOG);
  url.search = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: SCOPES,
    // state,
  }).toString();

  return res.redirect(302, url.toString());
})

instaRouter.get("/callback", async (req: Request, res: Response) => {
  try {
    const { code, state } = req.query as { code?: string; state?: string };
    if (!code) return res.status(400).send("Missing code");

    const tokenResp = await axios.post(
    "https://api.instagram.com/oauth/access_token",
    new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI, 
        code,                
    }).toString(),
    {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
    );

    const { access_token, user_id } = tokenResp.data;  
    //long-lived token
    const llResp = await axios.get("https://graph.instagram.com/access_token", {
      params: {
        grant_type: "ig_exchange_token",
        client_secret: CLIENT_SECRET,
        access_token: access_token,
      },
    });

    const longLivedToken = llResp.data.access_token;
    console.log("long lived token : ",longLivedToken);
    

    // Store in DB (example with Prisma)
    await prisma.users.update({
      where: { id: "cmgqsrrhh0001ydpo3317qyw8"}, 
      //@ts-ignore
        data: {
        access_token: longLivedToken
    },
    });

    // Redirect to your app without leaking code in the URL
    const ui = new URL("http://localhost:5173/app");
    ui.searchParams.set("connected", "true");
    return res.redirect(ui.toString());
  } catch (e: any) {
    console.error("OAuth callback error:", e?.response?.data || e.message);
    return res.redirect("http://localhost:5173/app?connected=false");
  }
});

export default instaRouter