import { prisma } from "../lib/prisma"
import { Request, Response } from "express"

export const getContacts =  async (req : Request, res : Response) => {
    try {
        // @ts-ignore
        const id = req.id
        const contacts = await prisma.contacts.findMany({
            where : {
                userId : id
            },
            orderBy : {
                createdAt : "desc"
            }
        })

        res.json({contacts})
    } catch (error) {
        res.status(500).json({error : "Failed to fetch contacts"}) 
    }
}