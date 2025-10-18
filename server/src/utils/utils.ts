import crypto from "crypto"
import  argon2  from "argon2"

export const OTPgenerator : (digit : number) => string  = (digit ) => {
     const otp = crypto.randomInt(0, 10 ** digit).toString().padStart(digit, "0")
     return otp
}

const PEPPER = Buffer.from(process.env.PEPPER || "")

export const hashOTP : (otp : any) => any = async (otp) => {
    const otpHash = await argon2.hash(otp ,{
            type : argon2.argon2id,
            secret : PEPPER
        })
    return otpHash
}

export const verifyOTP : (otp : any, hashOTP : any) => any =   async (otp,hashOTP) => {
    const ok = await argon2.verify(otp, hashOTP,{secret : PEPPER})
    return ok
}
