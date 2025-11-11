import crypto from "crypto"
import argon2 from "argon2"
import { prisma } from "../lib/prisma"

export const OTPgenerator: (digit: number) => string = (digit) => {
    const otp = crypto.randomInt(0, 10 ** digit).toString().padStart(digit, "0")
    return otp
}

const PEPPER = Buffer.from(process.env.PEPPER || "")

export const hashOTP: (otp: any) => any = async (otp) => {
    const otpHash = await argon2.hash(otp, {
        type: argon2.argon2id,
        secret: PEPPER
    })
    return otpHash
}

export const verifyOTP: (otp: any, hashOTP: any) => any = async (otp, hashOTP) => {
    const ok = await argon2.verify(otp, hashOTP, { secret: PEPPER })
    return ok
}


export const saveContact = async (username: string, user: any) => {
    try {

        // const exist = await prisma.contacts.findFirst({
        //     where: {
        //         username,
        //         userId
        //     }
        // });
        // if (exist) {
        //     console.log("⚠️ Contact already exists");
        //     return;
        // }

        if (user.plan == "FREE") {
            const isContactValid = await contactValidator(user.id)
            if (isContactValid) {
                console.log("contact saved exceed for free plan ");
                return
            }
        }
        await prisma.contacts.create({
            data: {
                username,
                user: { connect: { id: user.id } },
            }
        });
        console.log("✅ Contact saved successfully");
    } catch (error) {
        console.error("❌ Error saving contact:", error);
    }
};

export const sendCount = async (id) => {
    try {
        await prisma.automation.update({
            where: { id: id },
            data: { sentCount: { increment: 1 } },
        });
    } catch (error) {

    }
}

const messagePlanLimit = {
    FREE: 1000,
    PRO: null,
    ULTIMATE: null,
}

export const messageVaidator = async (user) => {

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const MessageCount = await prisma.contacts.count({
        where: {
            userId: user.id,
            createdAt: { gte: startOfMonth },
        },
    });
    if (MessageCount > messagePlanLimit.FREE) {
        return false
    }
    return true
}

const contactPlanLimit = {
    FREE: 1000,
    PRO: null,
    ULTIMATE: null,
}

const contactValidator = async (userid) => {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const contactCount = await prisma.contacts.count({
        where: {
            userId: userid,
            createdAt: { gte: startOfMonth },
        },
    });
    if (contactCount > contactPlanLimit.FREE) {
        return false
    }
    return true
}