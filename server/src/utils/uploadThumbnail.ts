import { cloudinary } from "../lib/cloudinary";

const uploadThumbnail =  async (thumbnailUrl) => {
    const result = await cloudinary.uploader.upload(thumbnailUrl, {
        folder: "instagram-thumbnails",
        resource_type: "image",
    });
    console.log(result);
    

    return result.secure_url;
}
export default uploadThumbnail