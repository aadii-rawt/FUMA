
import { json, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import argon2 from "argon2";
import jwt  from "jsonwebtoken";

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

export const signup  = async (req : Request,res : Response) => {
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

export const verifyOTP  = (req : Request,res : Response) => {

}

