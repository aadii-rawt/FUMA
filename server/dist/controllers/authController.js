"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.googleAuthCallback = exports.googleAuth = exports.passportGoogle = exports.getDetails = exports.verifySignupOTP = exports.signup = exports.verifyLoginOTP = exports.login = void 0;
const prisma_1 = require("../lib/prisma");
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils/utils");
const sendOTP_1 = require("../utils/sendOTP");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const emailTemplates_1 = require("../utils/emailTemplates");
// login send opt to email 
const login = async (req, res) => {
    const email = (req.body.email || "").trim().toLowerCase();
    if (!email)
        return res.status(400).json({ error: "email is required" });
    const user = await prisma_1.prisma.users.findFirst({
        where: { email }
    });
    // @ts-ignore
    if (!user)
        return res.status(401).json({ error: "Email does not exist." });
    await sendOTP(req, res, email, "login");
};
exports.login = login;
// verify otp and login user
const verifyLoginOTP = async (req, res) => {
    const email = (req.body.email || "").trim().toLowerCase();
    const otp = (req.body.otp || "").trim();
    if (!email || !otp)
        return res.status(401).json({ message: "Please enter email and OTP" });
    const record = await prisma_1.prisma.otp.findFirst({
        where: { email: email },
        orderBy: { createdAt: "desc" }
    });
    if (!record)
        return res.status(400).json({ error: "Someting went wrong" });
    if (new Date(record.expiresAt) < new Date()) {
        return res.status(400).json({ error: "OTP expired" });
    }
    const PEPPER = Buffer.from(process.env.PEPPER || "");
    const ok = await argon2_1.default.verify(record.otp, otp, { secret: PEPPER });
    if (!ok) {
        return res.status(401).json({ error: "Invalid OTP" });
    }
    await prisma_1.prisma.otp.delete({ where: { id: record.id } });
    const user = await prisma_1.prisma.users.findFirst({
        where: { email: email }
    });
    // @ts-ignore
    if (!user)
        return res.status(401).json({ error: "Someting went wrong" });
    const JWT_SECRET = Buffer.from(process.env.JWT_SECRET || "");
    const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, {
        httpOnly: false,
        // secure: isProd,                  
        secure: process.env.NODE_ENV !== "development",
        maxAge: 1000 * 60 * 60,
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
    });
    res.json({
        data: user
    });
};
exports.verifyLoginOTP = verifyLoginOTP;
// send otp to email
const signup = async (req, res) => {
    const email = (req.body.email || "").trim().toLowerCase();
    if (!email)
        return res.status(400).json({ error: "email is required" });
    const user = await prisma_1.prisma.users.findFirst({
        where: { email: email }
    });
    // @ts-ignore
    if (user)
        return res.status(401).json({ error: "Email already exist." });
    await sendOTP(req, res, email, "singup");
};
exports.signup = signup;
// verify otp and create user
const verifySignupOTP = async (req, res) => {
    const email = (req.body.email || "").trim().toLowerCase();
    const otp = (req.body.otp || "").trim();
    if (!email || !otp)
        return res.status(401).json({ message: "Please enter email and OTP" });
    const record = await prisma_1.prisma.otp.findFirst({
        where: { email: email },
        orderBy: { createdAt: "desc" }
    });
    if (!record)
        return res.status(400).json({ error: "Someting went wrong" });
    if (new Date(record.expiresAt) < new Date()) {
        return res.status(400).json({ error: "OTP expired" });
    }
    const PEPPER = Buffer.from(process.env.PEPPER || "");
    console.log(otp);
    const ok = await argon2_1.default.verify(record.otp, otp, { secret: PEPPER });
    if (!ok) {
        return res.status(401).json({ error: "Invalid OTP" });
    }
    await prisma_1.prisma.otp.delete({ where: { id: record.id } });
    try {
        const user = await prisma_1.prisma.users.create({
            //@ts-ignore
            data: { email: email }
        });
        const JWT_SECRET = Buffer.from(process.env.JWT_SECRET || "");
        const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: false,
            // secure: isProd,                  
            secure: process.env.NODE_ENV !== "development",
            maxAge: 1000 * 60 * 60,
            sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        });
        res.json({
            data: user
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            message: error
        });
    }
};
exports.verifySignupOTP = verifySignupOTP;
// function to send otp and email
//@ts-ignore
const sendOTP = async (req, res, email, purpose = "login") => {
    const now = new Date();
    const exist = await prisma_1.prisma.otp.findFirst({
        where: { email },
        orderBy: { createdAt: "desc" }
    });
    if (exist && now.getTime() - new Date(exist.createdAt).getTime() < 60_000) {
        return res.status(429).json({ error: "Please wait before requesting another opt" });
    }
    const otp = (0, utils_1.OTPgenerator)(6);
    const otpHash = await (0, utils_1.hashOTP)(otp);
    const expireAt = new Date(now.getTime() + 10 * 60_000);
    await prisma_1.prisma.otp.create({
        data: {
            email: email,
            otp: otpHash,
            expiresAt: expireAt
        }
    });
    try {
        await (0, sendOTP_1.sendEmail)({
            to: email,
            subject: "FUMA - OTP for auth verification",
            html: purpose == "login" ? (0, emailTemplates_1.loginEmailTemplate)(otp) : (0, emailTemplates_1.signupEmailTemplate)(otp)
        });
        res.status(200).json({ message: "OTP sent to email" });
    }
    catch (err) {
        res.status(500).json({ msg: "Failed to send OTP" });
    }
};
const getDetails = async (req, res) => {
    try {
        // @ts-ignore
        const id = req.id;
        if (!id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const data = await prisma_1.prisma.users.findFirst({
            where: { id }
        });
        res.json({ data });
    }
    catch (err) {
        console.error("Get details error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getDetails = getDetails;
// --- configure passport strategy here (no sessions; we issue our own JWT) ---
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    // @ts-ignore
    clientID: process.env.GOOGLE_CLIENT_ID,
    // @ts-ignore
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, 
// verify callback
async (_accessToken, _refreshToken, profile, done) => {
    try {
        const email = profile.emails && profile.emails[0]?.value
            ? profile.emails[0].value.toLowerCase()
            : "";
        if (!email)
            return done(new Error("Google did not return an email"));
        const avatar = profile.photos && profile.photos[0]?.value ? profile.photos[0].value : null;
        const username = profile.displayName || null;
        let user = await prisma_1.prisma.users.findUnique({ where: { email } });
        if (!user) {
            user = await prisma_1.prisma.users.create({
                data: {
                    email,
                },
            });
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
}));
exports.passportGoogle = passport_1.default;
function setAuthCookie(res, userId) {
    const JWT_SECRET = Buffer.from(process.env.JWT_SECRET || "");
    const token = jsonwebtoken_1.default.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, {
        httpOnly: false, // (recommend true in production; keep to match your current behavior)
        secure: process.env.NODE_ENV !== "development",
        maxAge: 1000 * 60 * 60,
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
    });
}
exports.googleAuth = passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
});
const googleAuthCallback = (req, res, next) => {
    passport_1.default.authenticate("google", { session: false }, (err, user) => {
        if (err || !user) {
            console.error("Google auth error:", err);
            return res.redirect("/auth/google/failure");
        }
        // user is the Prisma user object returned in the strategy
        setAuthCookie(res, user.id);
        return res.redirect(process.env.FRONTEND_SUCCESS_URL);
    })(req, res, next);
};
exports.googleAuthCallback = googleAuthCallback;
const logout = async (req, res) => {
    // @ts-ignore
    const id = req.id;
    if (!id)
        return res.status(401).json({ error: "Unauthorized" });
    try {
        res.clearCookie("token", {
            httpOnly: false,
            // secure: isProd,                  
            secure: process.env.NODE_ENV !== "development",
            maxAge: 1000 * 60 * 60,
            sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        });
        res.status(200).json({ msg: "logut", success: true });
    }
    catch (error) {
        res.status(500).json({ msg: "Something went worng" });
    }
};
exports.logout = logout;
//# sourceMappingURL=authController.js.map