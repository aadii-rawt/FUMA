"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAutomation = exports.getAutomation = void 0;
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
    // @ts-ignore
    const userId = req.id;
    // @ts-ignore
    const { post } = req.body;
    try {
        await prisma_1.prisma.automation.create({
            data: {
                userId,
                ...post
            }
        });
        res.json({ message: "automatin created  " });
    }
    catch (error) {
        res.json({ msg: "error get " });
    }
};
exports.createAutomation = createAutomation;
//# sourceMappingURL=automationController.js.map