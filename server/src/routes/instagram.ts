import {Request, Response, Router} from "express"
const instaRouter = Router()
import axios from "axios";
import { prisma } from "../lib/prisma";
import { auth } from "../middleware/auth";

const IG_OAUTH_DIALOG = "https://www.instagram.com/oauth/authorize";
const CLIENT_ID = process.env.META_APP_ID!;
const CLIENT_SECRET = process.env.META_APP_SECRET!;
const REDIRECT_URI = process.env.OAUTH_REDIRECT_URI!;

const SCOPES = [
  "instagram_business_basic",
  "instagram_business_content_publish",
  "instagram_business_manage_messages",
  "instagram_business_manage_comments",
].join(",");

instaRouter.get("/connect", auth, (req: Request, res: Response) => {
  // @ts-ignore
  const id = req.id
  const url = new URL(IG_OAUTH_DIALOG);
  url.search = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: SCOPES,
    id : id
  }).toString();

  return res.redirect(302, url.toString());
})

instaRouter.get("/callback", async (req: Request, res: Response) => {
  try {
    const { code,id } = req.query as { code?: string; id?: string };
    if (!code) return res.status(400).send("Missing code");

    // generate token    
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

    const { access_token} = tokenResp.data;  
    //long-lived token
    const llResp = await axios.get("https://graph.instagram.com/access_token", {
      params: {
        grant_type: "ig_exchange_token",
        client_secret: CLIENT_SECRET,
        access_token: access_token,
      },
    });

    // account details
    const longLivedToken = llResp.data.access_token;
    const fields = "id,user_id,username,name,profile_picture_url"
    const user = await axios.get("https://graph.instagram.com/v21.0/me", {
      params : {
        fields : fields,
        access_token : longLivedToken
      }
    })
    console.log("user data :", user.data);
    
    console.log("long lived token : ",longLivedToken);  
    await prisma.users.update({
      where: { id : id}, 
      //@ts-ignore
        data: {
        access_token: longLivedToken,
        // @ts-ignore
        username : user.data.username,
        // @ts-ignore
        avatar : user.data.profile_picture_url
    },
    });

    const ui = new URL(`${process.env.CORS_ORIGIN}/app`);
    return res.redirect(ui.toString());
  } catch (e: any) {
    console.error("OAuth callback error:", e?.response?.data || e.message);
    return res.redirect(`${process.env.CORS_ORIGIN}/auth/connect/instagram`);
  }
});

export default instaRouter