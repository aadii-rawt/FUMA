"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTP = exports.hashOTP = exports.OTPgenerator = void 0;
const crypto_1 = __importDefault(require("crypto"));
const argon2_1 = __importDefault(require("argon2"));
const OTPgenerator = (digit) => {
    const otp = crypto_1.default.randomInt(0, 10 ** digit).toString().padStart(digit, "0");
    return otp;
};
exports.OTPgenerator = OTPgenerator;
const PEPPER = Buffer.from(process.env.PEPPER || "");
const hashOTP = async (otp) => {
    const otpHash = await argon2_1.default.hash(otp, {
        type: argon2_1.default.argon2id,
        secret: PEPPER
    });
    return otpHash;
};
exports.hashOTP = hashOTP;
const verifyOTP = async (otp, hashOTP) => {
    const ok = await argon2_1.default.verify(otp, hashOTP, { secret: PEPPER });
    return ok;
};
exports.verifyOTP = verifyOTP;
//# sourceMappingURL=utils.js.map