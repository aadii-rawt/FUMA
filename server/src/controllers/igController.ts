import axios from "axios"
import { Request, Response } from "express"
import { prisma } from "../lib/prisma"
import { use } from "passport"

export const getPost = async (req : Request, res: Response) => {
    try {
        const {limit,access_token} = req.query
        const user = await prisma.users.findFirst({
            where: {
                // @ts-ignore
                id: req.id
            }
        })
        if(!user || !user.access_token){
            return res.status(400).json({error: "Instagram not connected"})
        }
        const fields = "thumbnail_url,media_type,media_product_type,timestamp,like_count,comments_count,caption,media_url,permalink"
        const data = await axios.get(`${process.env.INSTA_API}/${user.ig_id}/media`,
                    {
                        params: {
                        fields,
                        access_token : access_token,
                        limit , 
                        },
                    }
                    );

        res.json({data : data.data.data})
        
    } catch (error) {
        res.json({error: "someting went wrong"})
    }
}