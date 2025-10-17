import axios from "axios"
import { Request, Response } from "express"

export const getPost = async (req : Request, res: Response) => {
    try {
        const {limit,access_token} = req.query
        // const access_token = "EAAf98hmCRFQBPtZCdvIUeBrf5uAVYD2MZBkXCTU690ZAFbcNeFRuLCpgCZCGcE5lyBVqYSt6PbqAFmZCKAnufe09IwDhykKGZAMqLux33V17bEks5nRC3uQCNtqx7R6lTBryJZBMhBy2d2E5c7fPZCnCZADw28nihA2trV7iVxR09PcSbrUyrgEmaF9zKGLkU"
        const fields = "thumbnail_url,media_type,media_product_type,timestamp,like_count,comments_count,media_url,permalink,comments{id,from,username,text,timestamp,like_count,parent_id,replies{id,from,username,timestamp,like_count,text}}"
        const data = await axios.get("https://graph.instagram.com/v21.0/17841475766446171/media",
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