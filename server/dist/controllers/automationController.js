"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAutomation = exports.getAutomation = void 0;
const cloudinary_1 = require("../lib/cloudinary");
const prisma_1 = require("../lib/prisma");
const getAutomation = async (req, res) => {
    // @ts-ignore
    const userId = req.id;
    try {
        const data = await prisma_1.prisma.automation.findMany({
            where: {
                userId
            }
        });
        console.log(data);
        res.json(data);
    }
    catch (error) {
        console.log(error);
    }
};
exports.getAutomation = getAutomation;
const createAutomation = async (req, res) => {
    // @ts-ignore
    const userId = req.id;
    // @ts-ignore
    const { post } = req.body;
    try {
        console.log(post);
        let dmImageUrl = post.dmImageUrl;
        console.log(dmImageUrl);
        // Upload image if provided
        if (post.imageDataUrl?.startsWith("data:image/")) {
            const uploaded = await cloudinary_1.cloudinary.uploader.upload(post.imageDataUrl, {
                folder: `autodm/${userId}`,
                resource_type: "image",
            });
            dmImageUrl = uploaded.secure_url;
        }
        await prisma_1.prisma.automation.create({
            data: {
                userId,
                ...post,
                dmImageUrl
            }
        });
        res.json({ message: "automatin created  " });
    }
    catch (error) {
        res.json({ msg: "error get " });
    }
};
exports.createAutomation = createAutomation;
//# sourceMappingURL=automationController.js.map