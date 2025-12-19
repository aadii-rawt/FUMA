import { prisma } from "../lib/prisma";

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



