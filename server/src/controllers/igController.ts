import axios from "axios"
import { Request, Response } from "express"

export const getPost = async (req : Request, res: Response) => {
    try {
        const {limit,access_token} = req.query
        const fields = "thumbnail_url,media_type,media_product_type,timestamp,like_count,comments_count,media_url,permalink"
        const data = await axios.get(`${process.env.INSTA_API}/${process.env.IG_BUSINESS_ID}/media`,
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