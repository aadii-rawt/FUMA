
import { prisma } from "../lib/prisma"
import { Request, Response } from "express"


export const getAutomation = async (req : Request, res : Response) => {
    // @ts-ignore
    const userId = req.id
    try {
        const data = await  prisma.automation.findMany({
            where : {
                userId
            }
        })
        console.log(data);
        res.json(data)
    } catch (error) {
        console.log(error);
        
    }
}

export const createAutomation = async (req : Request,res : Response)  => {
    // @ts-ignore
    const userId = req.id
    // @ts-ignore
    const {post} = req.body
    try {
        await prisma.automation.create({
            data : {
                userId,
                ...post
            }
        })
        res.json({message : "automatin created  "})
    } catch (error) {
        res.json({msg : "error get "})
    }
}