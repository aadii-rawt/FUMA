"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscription = exports.getSubscriptionDetails = void 0;
const prisma_1 = require("../lib/prisma");
const getSubscriptionDetails = async (req, res) => {
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
//# sourceMappingURL=subscriptionController.js.map