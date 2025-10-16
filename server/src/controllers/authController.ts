
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import argon2 from "argon2";
import jwt  from "jsonwebtoken";
import { hashOTP, OTPgenerator } from "../utils/utils";
import { sendEmail } from "../utils/sendOTP";
import { loginEmailTemplate, signupEmailTemplate } from "../utils/emailTemplates";
import axios from "axios";

// login send opt to email 
export const login  =  async (req : Request,res : Response) => {
   const email = (req.body.email || "").trim().toLowerCase()

    if(!email) return res.status(400).json({error : "email is required"})

    const user = await prisma.users.findFirst({
        where : { email }
    })
    // @ts-ignore
    if(!user) return res.status(401).json({error: "Email does not exist."})
    
    await sendOTP(req,res,email,"login")

}
// verify otp and login user
export const verifyLoginOTP = async (req : Request, res: Response) => {
    const email = (req.body.email || "").trim().toLowerCase()
    const otp = (req.body.otp || "").trim()

    if(!email || !otp) return res.status(401).json({message : "Please enter email and OTP"})

    const record = await prisma.otp.findFirst({
        where : {email : email},
        orderBy : {createdAt : "desc"}
    })

    if(!record) return res.status(400).json({error : "Someting went wrong"})

    if(new Date(record.expiresAt) < new Date()){
        return res.status(400).json({error : "OTP expired"})
    }

    const PEPPER = Buffer.from(process.env.PEPPER || "")
    const ok = await argon2.verify(record.otp, otp, {secret : PEPPER})
    if(!ok){
        return res.status(401).json({error : "Invalid OTP"})
    }

    await prisma.otp.delete({ where : { id : record.id } })

     const user = await prisma.users.findFirst({
        where : { email : email }
    })
    // @ts-ignore
    if(!user) return res.status(401).json({error: "Someting went wrong"})
    const JWT_SECRET = Buffer.from(process.env.JWT_SECRET || "")
    const token = jwt.sign({id : user.id}, JWT_SECRET, {expiresIn : "1h"})

    res.cookie("token", token, {
        httpOnly: false,                  
        // secure: isProd,                  
        sameSite: "none",                
        maxAge: 1000 * 60 * 60,              
        path: "/",  
    })

    res.json({
       token : token
    })

}
// send otp to email
export const signup  = async (req : Request,res : Response) => {
    const email = (req.body.email || "").trim().toLowerCase()

    if(!email) return res.status(400).json({error : "email is required"})
    
    const user = await prisma.users.findFirst({
        where : { email : email }
    })
    // @ts-ignore
    if(user) return res.status(401).json({error: "Email already exist."})

    await sendOTP(req,res,email,"singup")
}
// verify otp and create user
export const verifySignupOTP = async (req : Request,res : Response) => {
     const email : string = (req.body.email || "").trim().toLowerCase()
    const otp = (req.body.otp || "").trim()

    if(!email || !otp) return res.status(401).json({message : "Please enter email and OTP"})

    const record = await prisma.otp.findFirst({
        where : {email : email},
        orderBy : {createdAt : "desc"}
    })

    if(!record) return res.status(400).json({error : "Someting went wrong"})

    if(new Date(record.expiresAt) < new Date()){
        return res.status(400).json({error : "OTP expired"})
    }

    const PEPPER = Buffer.from(process.env.PEPPER || "")
    console.log(otp);
    
    const ok = await argon2.verify(record.otp, otp, {secret : PEPPER})
    if(!ok){
        return res.status(401).json({error : "Invalid OTP"})
    }

    await prisma.otp.delete({ where : { id : record.id } })

    try {
        const user =  await prisma.users.create({
            //@ts-ignore
            data : { email : email}
        })
        const JWT_SECRET = Buffer.from(process.env.JWT_SECRET || "")
        const token = jwt.sign({id : user.id},JWT_SECRET, {expiresIn : "1h"})
        res.cookie("token", user.id , {
            httpOnly: false,                  
        // secure: isProd,                  
            sameSite: "none",                
            maxAge: 1000 * 60 * 60,              
            path: "/",
        })
        res.json({
            token 
        })
    } catch (error) {
        console.log(error);
        
            res.json({
                message : error
            })
            
    }

}
// function to send otp and email
//@ts-ignore
const sendOTP : any = async (req, res, email,purpose="login") => {
    const now = new Date()
    const exist = await prisma.otp.findFirst({
        where : {email},
        orderBy : { createdAt : "desc"}
    })

    if(exist && now.getTime() - new Date(exist.createdAt).getTime() < 60_000) {
        return res.status(429).json({error : "Please wait before requesting another opt"})
    }

    const otp = OTPgenerator(6)
    const otpHash = await hashOTP(otp)
    const expireAt = new Date(now.getTime() + 10 * 60_000)

    await prisma.otp.create({
        data : {
            email : email,
            otp : otpHash,
            expiresAt : expireAt
        }
    })

    try {
    await sendEmail({
      to: email,
      subject: "FUMA - OTP for auth verification",
      html: purpose == "login" ? loginEmailTemplate(otp) : signupEmailTemplate(otp)
    });

    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to send OTP"});
  }


}

export const connectInsta = async (req : Request,res : Response) => {

    const data = await axios.get("https://www.instagram.com/oauth/authorize", {
  params: {
    client_id: "836625295511261",
    redirect_uri: "https://fuma.dotdazzle.in/app",
    response_type: "code",
    scope:
      "instagram_business_basic,instagram_business_content_publish,instagram_business_manage_messages,instagram_business_manage_comments",
  },
});
    
}

// // src/routes/auth.ts
// import { Router, Request, Response } from "express";
// import crypto from "crypto";
// import axios from "axios";

// const router = Router();

// const FB_OAUTH_DIALOG = "https://www.facebook.com/v18.0/dialog/oauth";
// const FB_TOKEN_URL = "https://graph.facebook.com/v18.0/oauth/access_token";

// const CLIENT_ID = process.env.META_APP_ID!;
// const CLIENT_SECRET = process.env.META_APP_SECRET!;
// const REDIRECT_URI = process.env.OAUTH_REDIRECT_URI!;

// // the scopes you asked for (comma- or space-separated)
// const SCOPES = [
//   "instagram_business_basic",
//   "instagram_business_content_publish",
//   "instagram_business_manage_messages",
//   "instagram_business_manage_comments",
// ].join(",");

// /**
//  * GET /auth/instagram
//  * Redirect user to Meta OAuth dialog
//  */
// router.get("/instagram", (req: Request, res: Response) => {
//   // CSRF state
//   const state = crypto.randomBytes(16).toString("hex");
//   // store in cookie/session to verify later
//   res.cookie("oauth_state", state, { httpOnly: true, sameSite: "lax", secure: true });

//   const url = new URL(FB_OAUTH_DIALOG);
//   url.search = new URLSearchParams({
//     client_id: CLIENT_ID,
//     redirect_uri: REDIRECT_URI,
//     response_type: "code",
//     scope: SCOPES,
//     state,
//   }).toString();

//   return res.redirect(302, url.toString());
// });

// /**
//  * GET /auth/instagram/callback
//  * Exchange code -> access token, then (optionally) get long-lived token & IG business account
//  */


// router.get("/instagram/callback", async (req: Request, res: Response) => {
//   try {
//     const { code, state } = req.query as { code?: string; state?: string };

//     // Validate state
//     const cookieState = req.cookies?.oauth_state;
//     if (!code || !state || !cookieState || state !== cookieState) {
//       return res.status(400).send("Invalid OAuth state/code");
//     }

//     // Exchange code for short-lived user access token
//     const tokenResp = await axios.get(FB_TOKEN_URL, {
//       params: {
//         client_id: CLIENT_ID,
//         client_secret: CLIENT_SECRET,
//         redirect_uri: REDIRECT_URI,
//         code,
//       },
//     });

//     const { access_token, token_type, expires_in } = tokenResp.data;

//     // OPTIONAL: exchange for long-lived token (recommended)
//     const llResp = await axios.get(FB_TOKEN_URL, {
//       params: {
//         grant_type: "fb_exchange_token",
//         client_id: CLIENT_ID,
//         client_secret: CLIENT_SECRET,
//         fb_exchange_token: access_token,
//       },
//     });
//     const longLivedToken = llResp.data.access_token;

//     // OPTIONAL: fetch connected Pages and Instagram Business account id
//     // 1) Get user pages
//     const meAccounts = await axios.get("https://graph.facebook.com/v18.0/me/accounts", {
//       params: { access_token: longLivedToken, fields: "id,name,access_token" },
//     });

//     // 2) For each page, check instagram_business_account
//     let igBusinessId: string | undefined;
//     let pageAccessToken: string | undefined;

//     for (const page of meAccounts.data.data ?? []) {
//       const pageResp = await axios.get(`https://graph.facebook.com/v18.0/${page.id}`, {
//         params: { access_token: longLivedToken, fields: "instagram_business_account{id}" },
//       });
//       if (pageResp.data?.instagram_business_account?.id) {
//         igBusinessId = pageResp.data.instagram_business_account.id;
//         pageAccessToken = page.access_token;
//         break;
//       }
//     }

//     // TODO: Persist tokens (longLivedToken, pageAccessToken) & igBusinessId to your DB for the user.
//     // Redirect user back to your app with a success flag (or set a cookie/session and redirect clean).
//     const successUrl = new URL("https://fuma.dotdazzle.in/app");
//     successUrl.searchParams.set("connected", igBusinessId ? "true" : "false");
//     return res.redirect(successUrl.toString());
//   } catch (err: any) {
//     console.error("OAuth callback error:", err?.response?.data || err.message);
//     return res.status(500).send("OAuth error");
//   }
// });


