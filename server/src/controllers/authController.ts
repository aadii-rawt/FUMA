
import { json, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import argon2 from "argon2";
import jwt  from "jsonwebtoken";
import crypto from "crypto"
import {mailer} from 'nodemailer'
import { error, log } from "console";

export const login  =  async (req : Request,res : Response) => {
    const {email,password : PlainPassword} = req.body

    if(!email || !PlainPassword) return res.status(400).json({error : "email and password required"})

    const user = await prisma.users.findFirst({
        where : { email }
    })
    // @ts-ignore
    if(!user || !user.password) return res.status(401).json({error: "Invalid credentials"})

    const PEPPER = Buffer.from(process.env.PEPPER || "")
    const ok = await argon2.verify(user.password, PlainPassword, {secret : PEPPER})
    if(!ok) return res.status(401).json({error : "Invalid credentials"}) 
    
    const JWT_SECRET = process.env.JWT_SECRET ? Buffer.from(process.env.JWT_SECRET) : ""
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

export const signup  = async (email,password) => {
    const {email,password : plainPassword} = req.body
    const PEPPER = Buffer.from(process.env.PEPPER || "")
    
    if(!email || !plainPassword) return res.status(400).json({error : "email and password required"})

    try {
        const hashPassword = await argon2.hash(plainPassword,{
            type: argon2.argon2id,
            secret: PEPPER 
        })

        const isExist = await prisma.users.findFirst({
            where : {
                email
            }
        })
        if(isExist) return res.status(401).json({error : "email alrady exist please login"})

        const user =  await prisma.users.create({
            data : {
                email : email,
                password : hashPassword
            }
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
            res.json({
                message : error
            })
            
    }
}

export const sendOTP = async (req : Request , res : Response) => {
    const email = (req.body.email || "").trim().toLowerCase()
    if(!email) return res.status(401).json({error : "Email is required"})

    const now = new Date()
    const exist = await prisma.otp.findFirst({
        where : {email},
        orderBy : { createdAt : "desc"}
    })

    if(exist && now.getTime() - new Date(exist.createdAt).getTime() < 60_000) {
        return res.status(429).json({error : "Please wait before requesting another opt"})
    }

    const PEPPER = Buffer.from(process.env.PEPPER || "")

    const otp = crypto.randomInt(0, 10 ** 6).toString().padStart(6, "0")
    const otpHash = await argon2.hash(otp ,{
        type : argon2.argon2id,
        secret : PEPPER
    })
    const expireAt = new Date(now.getTime() + 10 * 60_000)

    await prisma.otp.create({
        data : {
            email : email,
            otp : otpHash,
            expiresAt : expireAt
        }
    })

    const html = `
         <p>Your verification code is:</p>
    <h2 style="letter-spacing:3px;margin:0">${otp}</h2>
    <p>This code expires in 10 minutes.</p>
    `
    try {
        await mailer.sendMail({
            from : process.env.FROM_EMAIL,
            to : email,
            subject : "Verity OTP",
            html
        })
    } catch (error){
        res.status(500).json({error : "Failed to send OTP"})
    }

    res.json(200).json({ok : true, message : "OTP send"})
}

export const verifyOTP  = async (req : Request,res : Response) => {
    const email = (req.body.email || "").trim().toLowerCase()
    const opt = (req.body.otp || "").trim()

    if(!email || !opt) return res.status(401).json({message : "Please enter email and OTP"})

    const record = await prisma.otp.findFirst({
        where : email,
        orderBy : {createdAt : "desc"}
    })

    if(!record) return res.status(400).json({error : "Someting went wrong"})

    if(new Date(record.expiresAt) < new Date()){
        return res.status(400).json({error : "OTP expired"})
    }

    const PEPPER = Buffer.from(process.env.PEPPER || "")
    const ok = await argon2.verify(opt, record.otp, {secret : PEPPER})
    if(!ok){
        return res.status(401).json({error : "Invalid OTP"})
    }

    await prisma.otp.delete({ where : { id : record.id } })

    await signup()
 }

