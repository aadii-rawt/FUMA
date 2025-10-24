
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

export const createAutomation = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId: string = req.id;
    const { post } = req.body 

    if (!post) {
      return res.status(400).json({ error: "Missing post payload" });
    }

    let dmImageUrl = post.dmImageUrl ?? null;

    // If we received a data URI, upload it. If it's already a URL, keep it.
    if (dmImageUrl && dmImageUrl.startsWith("data:image")) {
      const result = await cloudinary.uploader.upload(dmImageUrl, {
        folder: "FUMA",
        resource_type: "image",
      });
      dmImageUrl = result.secure_url;
      console.log("Cloudinary URL:", dmImageUrl);
    } 

    // ⚠️ Avoid re-saving the original base64. Build the data explicitly:
   
    await prisma.automation.create({
      data: {
        userId,
        ...post,
        dmImageUrl : dmImageUrl || null,
      },
    });

    return res.json({ message: "automation created", dmImageUrl });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create automation" });
  }
};

export const updateAutomation = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId: string = req.id;
    const { id } = req.params; // Automation ID
    const { post } = req.body;

    if (!id) return res.status(400).json({ error: "Missing automation ID" });
    if (!post) return res.status(400).json({ error: "Missing post payload" });

    let dmImageUrl = post.dmImageUrl ?? null;

    // 🔹 If new image is provided as base64 (data URI)
    if (dmImageUrl && dmImageUrl.startsWith("data:image")) {
      const uploaded = await cloudinary.uploader.upload(dmImageUrl, {
        folder: `FUMA/${userId}`,
        resource_type: "image",
      });
      dmImageUrl = uploaded.secure_url;
      console.log("Updated Cloudinary image:", dmImageUrl);
    }

    // 🔹 Update only fields that are allowed to be changed
    const updated = await prisma.automation.update({
      where: { id },
      data: {
        ...post,
        dmImageUrl: dmImageUrl || null,
        updatedAt: new Date(),
      },
    });

    return res.json({
      message: "Automation updated successfully",
      automation: updated,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to update automation",
      details: error.message,
    });
  }
};


export const stopAutomation = async (req : Request, res : Response) => {
  // @ts-ignore
  const id = req.id 
  // @ts-ignore
  const {id : postId} = req.params
  try {
    
    const data = await prisma.automation.update({
      where : {
        userId : id,
        id : postId
      },
      data : {
        status : "PAUSED"
      }
    })

    res.status(200).json({msg : "automation updated"})
    
  } catch (error) {
    res.json({error : "something went worng"})
  }
  
}