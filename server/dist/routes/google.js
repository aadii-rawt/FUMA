"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const prisma_1 = require("../lib/prisma");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        const email = profile.emails && profile.emails[0]?.value
            ? profile.emails[0].value.toLowerCase()
            : "";
        if (!email)
            return done(new Error("Google did not return an email"));
        let user = await prisma_1.prisma.users.findUnique({ where: { email } });
        if (!user) {
            user = await prisma_1.prisma.users.create({
                data: { email },
            });
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
}));
exports.default = passport_1.default;
//# sourceMappingURL=google.js.map