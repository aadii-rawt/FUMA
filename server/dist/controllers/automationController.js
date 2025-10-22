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
    try {
        // @ts-ignore
        const userId = req.id;
        const { post } = req.body;
        if (!post) {
            return res.status(400).json({ error: "Missing post payload" });
        }
        let dmImageUrl = post.dmImageUrl ?? null;
        // If we received a data URI, upload it. If it's already a URL, keep it.
        if (dmImageUrl && dmImageUrl.startsWith("data:image")) {
            const result = await cloudinary_1.cloudinary.uploader.upload(dmImageUrl, {
                folder: "FUMA",
                resource_type: "image",
            });
            dmImageUrl = result.secure_url;
            console.log("Cloudinary URL:", dmImageUrl);
        }
        // ⚠️ Avoid re-saving the original base64. Build the data explicitly:
        await prisma_1.prisma.automation.create({
            data: {
                userId,
                ...post,
                dmImageUrl: dmImageUrl || null,
            },
        });
        return res.json({ message: "automation created", dmImageUrl });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to create automation" });
    }
};
exports.createAutomation = createAutomation;
//# sourceMappingURL=automationController.js.map