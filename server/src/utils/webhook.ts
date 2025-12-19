// to store the send message to collect how many messages sends
import { prisma } from "../lib/prisma"
import { contactValidator } from "../middleware/contactValidator";

export const DMList = async (user, username, automationId) => {
    try {
        await prisma.dmList.create({
            data: {
                userId: user.id,
                username: username,
                automationId
            },

        })
    } catch (error) {
        console.log(error);
    }
}

export const saveContact = async (username: string, user: any) => {
    try {

        if (user.plan == "FREE") {
            const isContactValid = await contactValidator(user.id)
            if (isContactValid)  return
            
        }

        const exist = await prisma.contacts.findFirst({
            where: {
                username,
                userId: user.id
            }
        });
        if (exist)  return

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
