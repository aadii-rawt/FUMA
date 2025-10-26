import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

const planValidation = async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const userId = req.id

    const user = await prisma.users.findFirst({
        where: { id: userId },
        select: { plan: true }
    })

    if (!user) return res.status(403).json({ error: "user not found " })
    const planType = user.plan || "FREE"

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const automationsThisMonth = await prisma.automation.count({
        where: {
            userId,
            createdAt: { gte: startOfMonth },
        },
    });

    const planLimits = {
        FREE: 3,
        PRO: Infinity,
        ULTIMATE: Infinity,
    };

    if (planLimits[planType.toUpperCase() as keyof typeof planLimits] <= automationsThisMonth) {
        return res.status(403).json({
            error: `You have reached the limit of ${planLimits[planType.toUpperCase()]} automations for your ${planType} plan.`,
        });
    }
    next()
}

export default planValidation