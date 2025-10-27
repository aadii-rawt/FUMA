"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkRedirect = exports.automationCount = exports.stopAutomation = exports.updateAutomation = exports.createAutomation = exports.getAutomation = void 0;
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
const updateAutomation = async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.id;
        const { id } = req.params; // Automation ID
        const { post } = req.body;
        if (!id)
            return res.status(400).json({ error: "Missing automation ID" });
        if (!post)
            return res.status(400).json({ error: "Missing post payload" });
        let dmImageUrl = post.dmImageUrl ?? null;
        // 🔹 If new image is provided as base64 (data URI)
        if (dmImageUrl && dmImageUrl.startsWith("data:image")) {
            const uploaded = await cloudinary_1.cloudinary.uploader.upload(dmImageUrl, {
                folder: `FUMA/${userId}`,
                resource_type: "image",
            });
            dmImageUrl = uploaded.secure_url;
            console.log("Updated Cloudinary image:", dmImageUrl);
        }
        // 🔹 Update only fields that are allowed to be changed
        const updated = await prisma_1.prisma.automation.update({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Failed to update automation",
            details: error.message,
        });
    }
};
exports.updateAutomation = updateAutomation;
const stopAutomation = async (req, res) => {
    // @ts-ignore
    const id = req.id;
    // @ts-ignore
    const { id: postId } = req.params;
    try {
        const data = await prisma_1.prisma.automation.update({
            where: {
                userId: id,
                id: postId
            },
            data: {
                status: "PAUSED"
            }
        });
        res.status(200).json({ msg: "automation updated" });
    }
    catch (error) {
        res.json({ error: "something went worng" });
    }
};
exports.stopAutomation = stopAutomation;
const automationCount = async (req, res) => {
    // @ts-ignore
    const userId = req.id;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized" });
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const automationsThisMonth = await prisma_1.prisma.automation.count({
        where: {
            userId,
            createdAt: { gte: startOfMonth },
        },
    });
    res.json({ data: automationsThisMonth });
};
exports.automationCount = automationCount;
const linkRedirect = async (req, res) => {
    try {
        const { id } = req.params;
        const redirectUrl = req.query.to;
        console.log("to : ", req.query);
        if (!redirectUrl || !id)
            return res.status(400).send("Invalid link");
        // increment the counter
        await prisma_1.prisma.automation.update({
            where: { id },
            data: { clickCount: { increment: 1 } },
        });
        // redirect to the actual link
        return res.redirect(302, redirectUrl);
    }
    catch (error) {
        console.error("Tracking error:", error);
        return res.status(500).send("Server error");
    }
};
exports.linkRedirect = linkRedirect;
//# sourceMappingURL=automationController.js.map