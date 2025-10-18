import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = async (req : Request, res : Response, next : NextFunction) => {
    const token = req.cookies?.token
    
    if(!token) res.status(401).json({error : "Unauthorzied"})
    
    const JWT_SECRET = process.env.JWT_SECRET || ""
    try {
        const decode = jwt.verify(token,JWT_SECRET);
        // @ts-ignore
        req.id = decode.id
        next()
    } catch (error) {
        res.status(401).json({error : "Unauthorized"})
    }
}