
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
        secure: process.env.NODE_ENV !== "development",               
        maxAge: 1000 * 60 * 60,    
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
 
    })
    res.json({
       data : user
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
            secure: process.env.NODE_ENV !== "development",               
            maxAge: 1000 * 60 * 60,    
            sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        })
        res.json({
            data : user 
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

export const getDetails = async (req:Request, res : Response) => {
 try {
    // @ts-ignore
   const id = req.id
    if (!id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const data = await prisma.users.findFirst({
        where : {id}
    })
    res.json({data})
  } catch (err) {
    console.error("Get details error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
