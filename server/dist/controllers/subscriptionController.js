"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionExpire = exports.createSubscription = exports.getSubscriptionDetails = void 0;
const prisma_1 = require("../lib/prisma");
const getSubscriptionDetails = async (req, res) => {
    try {
        // @ts-ignore
        const id = req.id;
        if (!id)
            return res.status(401).json({ error: "Unauthorized" });
        const data = await prisma_1.prisma.subscription.findMany({
            where: { userId: id }
        });
        console.log("data :", data);
        res.json({ data });
    }
    catch (error) {
    }
};
exports.getSubscriptionDetails = getSubscriptionDetails;
const createSubscription = async (req, res) => {
    try {
        // @ts-ignore - set this in your auth middleware
        const id = req.id;
        if (!id)
            return res.status(401).json({ error: "Unauthorized" });
        const { razorpay, planKey, planTitle, interval, currency = "INR", amountSubtotal, taxAmount, discountAmount = 0, amountTotal, billingName, billingPhone, billingCountry, billingCity, } = req.body || {};
        if (!razorpay?.payment_id) {
            return res.status(400).json({ error: "Missing Razorpay payment_id" });
        }
        if (!planKey || !planTitle || !interval || !amountTotal) {
            return res.status(400).json({ error: "Missing required plan fields" });
        }
        // Compute current period
        const now = new Date();
        const currentPeriodStart = now;
        const currentPeriodEnd = interval === "YEARLY"
            ? new Date(now.getFullYear() + 1, now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds())
            : new Date(now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
        // Create subscription row
        const sub = await prisma_1.prisma.$transaction(async (tx) => {
            const sub = await prisma_1.prisma.subscription.create({
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
            const user = await prisma_1.prisma.users.update({
                where: { id },
                data: {
                    plan: planTitle,
                    purchaseAt: currentPeriodStart,
                    expireAt: currentPeriodEnd,
                },
            });
            return sub;
        }, {
            maxWait: 5000,
            timeout: 10000,
        });
        return res.json({ ok: true, subscription: sub });
    }
    catch (err) {
        console.error("Subscription confirm error:", err);
        return res.status(500).json({ error: "Failed to store subscription" });
    }
};
exports.createSubscription = createSubscription;
const subscriptionExpire = async (req, res) => {
    // @ts-ignore
    const userId = req.id;
    if (!userId)
        return res.status(401).json({ error: "unauthorized" });
    try {
        const data = await prisma_1.prisma.users.update({
            where: { id: userId },
            data: { plan: "FREE" }
        });
        res.json({ msg: "plan updated", data });
    }
    catch (error) {
        res.status(500).json({ error: "someting went wrong" });
    }
};
exports.subscriptionExpire = subscriptionExpire;
//# sourceMappingURL=subscriptionController.js.map