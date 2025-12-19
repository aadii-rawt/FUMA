// middleware to validator for free subscription user 
// if user contact list exceed then dont store the contact

import { prisma } from "../lib/prisma";

const contactPlanLimit = {
    FREE: 1000,
    PRO: null,
    ULTIMATE: null,
}

export const contactValidator = async (userid) => {
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