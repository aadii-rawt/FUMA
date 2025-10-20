"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token)
        res.status(401).json({ error: "Unauthorzied" });
    const JWT_SECRET = process.env.JWT_SECRET || "";
    try {
        const decode = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // @ts-ignore
        req.id = decode.id;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Unauthorized" });
    }
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map