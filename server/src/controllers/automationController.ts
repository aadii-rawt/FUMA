
import { cloudinary } from "../lib/cloudinary"
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
        
        console.log(post);
        
        let dmImageUrl: string | null = post.dmImageUrl;
        
            console.log(dmImageUrl);

    // Upload image if provided
    if (post.imageDataUrl?.startsWith("data:image/")) {
      const uploaded = await cloudinary.uploader.upload(post.imageDataUrl, {
        folder: `autodm/${userId}`,
        resource_type: "image",
      });
      dmImageUrl = uploaded.secure_url;
    }

        await prisma.automation.create({
            data : {
                userId,
                ...post,
                dmImageUrl
            }
        })
        res.json({message : "automatin created  "})
    } catch (error) {
        res.json({msg : "error get "})
    }
}