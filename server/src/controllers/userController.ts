import { Request, Response } from "express"
import { prisma } from "../lib/prisma";

export const userStats = async (req: Request, res: Response) => {
    // @ts-ignore
    const id = req.id

    try {
        const agg = await prisma.automation.aggregate({
            where: { userId: id },
            _sum: { sentCount: true },
        });
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const messageCount = agg._sum.sentCount ?? 0;

        const automationCount = await prisma.automation.count({
            where: {
                userId: id,
                createdAt: { gte: startOfMonth },
            },
        });

        const contactCount = await prisma.contacts.count({
            where: {
                userId: id,
                createdAt: { gte: startOfMonth }
            }
        })


        // prisma returns null when there are no rows; normalize to 0
        return res.json({ messageCount, automationCount,contactCount });
    } catch (err) {
        console.error("Failed to get total sent:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}