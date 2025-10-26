import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { json } from "stream/consumers";

export const getSubscriptionDetails = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const id = req.id
        if (!id) return res.status(401).json({ error: "Unauthorized" })

        const data = await prisma.subscription.findMany({
            where: { userId: id }
        })
        console.log("data :", data);

        res.json({ data })
    } catch (error) {

    }
}

export const createSubscription = async (req: Request, res: Response) => {
    try {
        // @ts-ignore - set this in your auth middleware
        const id: string | undefined = req.id;
        if (!id) return res.status(401).json({ error: "Unauthorized" });

        const {
            razorpay,
            planKey,
            planTitle,
            interval,
            currency = "INR",
            amountSubtotal,
            taxAmount,
            discountAmount = 0,
            amountTotal,
            billingName,
            billingPhone,
            billingCountry,
            billingCity,
        } = req.body || {};

        if (!razorpay?.payment_id) {
            return res.status(400).json({ error: "Missing Razorpay payment_id" });
        }
        if (!planKey || !planTitle || !interval || !amountTotal) {
            return res.status(400).json({ error: "Missing required plan fields" });
        }

        // Compute current period
        const now = new Date();
        const currentPeriodStart = now;
        const currentPeriodEnd =
            interval === "YEARLY"
                ? new Date(now.getFullYear() + 1, now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds())
                : new Date(now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());

        // Create subscription row

        const sub = await prisma.$transaction(async (tx) => {

            const sub = await prisma.subscription.create({
                data: {
                    userId: id,
                    planKey,
                    planTitle,
                    interval,
                    currentPeriodStart,
                    currentPeriodEnd,
                    cancelAtPeriodEnd: false,

                    // currency,
                    amountSubtotal: Number(amountSubtotal) || 0,
                    discountAmount: Number(discountAmount) || 0,
                    taxAmount: Number(taxAmount) || 0,
                    amountTotal: Number(amountTotal),

                    // provider: "RAZORPAY",
                    paymentId: razorpay.payment_id,
                    status: "ACTIVE",

                    billingName: billingName || null,
                    billingPhone: billingPhone || null,
                    billingCountry: billingCountry || null,
                    billingCity: billingCity || null,
                },
            });

            const user = await prisma.users.update({
                where: { id },
                data: {
                    plan: planTitle,
                    purchaseAt: currentPeriodStart,
                    expireAt: currentPeriodEnd,
                },
            });

            return sub
        },
            {
                maxWait: 5000,
                timeout: 10000,
            })

        return res.json({ ok: true, subscription: sub });
    } catch (err) {
        console.error("Subscription confirm error:", err);
        return res.status(500).json({ error: "Failed to store subscription" });
    }
}

export const subscriptionExpire = async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.id

    if (!userId) return res.status(401).json({ error: "unauthorized" })

    try {
        const data = await prisma.users.update({
            where: { id: userId },
            data: { plan: "FREE" }
        })
        res.json({msg : "plan updated", data})

    } catch (error) {
        res.status(500).json({error : "someting went wrong"})
    }
}