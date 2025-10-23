
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { hashOTP, OTPgenerator } from "../utils/utils";
import { sendEmail } from "../utils/sendOTP";
import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { loginEmailTemplate, signupEmailTemplate } from "../utils/emailTemplates";
// login send opt to email 
export const login = async (req: Request, res: Response) => {
  const email = (req.body.email || "").trim().toLowerCase()

  if (!email) return res.status(400).json({ error: "email is required" })

  const user = await prisma.users.findFirst({
    where: { email }
  })
  // @ts-ignore
  if (!user) return res.status(401).json({ error: "Email does not exist." })

  await sendOTP(req, res, email, "login")

}
// verify otp and login user
export const verifyLoginOTP = async (req: Request, res: Response) => {
  const email = (req.body.email || "").trim().toLowerCase()
  const otp = (req.body.otp || "").trim()

  if (!email || !otp) return res.status(401).json({ message: "Please enter email and OTP" })

  const record = await prisma.otp.findFirst({
    where: { email: email },
    orderBy: { createdAt: "desc" }
  })

  if (!record) return res.status(400).json({ error: "Someting went wrong" })

  if (new Date(record.expiresAt) < new Date()) {
    return res.status(400).json({ error: "OTP expired" })
  }

  const PEPPER = Buffer.from(process.env.PEPPER || "")
  const ok = await argon2.verify(record.otp, otp, { secret: PEPPER })
  if (!ok) {
    return res.status(401).json({ error: "Invalid OTP" })
  }

  await prisma.otp.delete({ where: { id: record.id } })

  const user = await prisma.users.findFirst({
    where: { email: email }
  })
  // @ts-ignore
  if (!user) return res.status(401).json({ error: "Someting went wrong" })
  const JWT_SECRET = Buffer.from(process.env.JWT_SECRET || "")
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" })

  res.cookie("token", token, {
    httpOnly: false,
    // secure: isProd,                  
    secure: process.env.NODE_ENV !== "development",
    maxAge: 1000 * 60 * 60,
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",

  })
  res.json({
    data: user
  })
}
// send otp to email
export const signup = async (req: Request, res: Response) => {
  const email = (req.body.email || "").trim().toLowerCase()

  if (!email) return res.status(400).json({ error: "email is required" })

  const user = await prisma.users.findFirst({
    where: { email: email }
  })
  // @ts-ignore
  if (user) return res.status(401).json({ error: "Email already exist." })

  await sendOTP(req, res, email, "singup")
}
// verify otp and create user
export const verifySignupOTP = async (req: Request, res: Response) => {
  const email: string = (req.body.email || "").trim().toLowerCase()
  const otp = (req.body.otp || "").trim()

  if (!email || !otp) return res.status(401).json({ message: "Please enter email and OTP" })

  const record = await prisma.otp.findFirst({
    where: { email: email },
    orderBy: { createdAt: "desc" }
  })

  if (!record) return res.status(400).json({ error: "Someting went wrong" })

  if (new Date(record.expiresAt) < new Date()) {
    return res.status(400).json({ error: "OTP expired" })
  }

  const PEPPER = Buffer.from(process.env.PEPPER || "")
  console.log(otp);

  const ok = await argon2.verify(record.otp, otp, { secret: PEPPER })
  if (!ok) {
    return res.status(401).json({ error: "Invalid OTP" })
  }

  await prisma.otp.delete({ where: { id: record.id } })

  try {
    const user = await prisma.users.create({
      //@ts-ignore
      data: { email: email }
    })
    const JWT_SECRET = Buffer.from(process.env.JWT_SECRET || "")
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" })
    res.cookie("token", token, {
      httpOnly: false,
      // secure: isProd,                  
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
    })
    res.json({
      data: user
    })
  } catch (error) {
    console.log(error);

    res.json({
      message: error
    })

  }

}
// function to send otp and email
//@ts-ignore
const sendOTP: any = async (req, res, email, purpose = "login") => {
  const now = new Date()
  const exist = await prisma.otp.findFirst({
    where: { email },
    orderBy: { createdAt: "desc" }
  })

  if (exist && now.getTime() - new Date(exist.createdAt).getTime() < 60_000) {
    return res.status(429).json({ error: "Please wait before requesting another opt" })
  }

  const otp = OTPgenerator(6)
  const otpHash = await hashOTP(otp)
  const expireAt = new Date(now.getTime() + 10 * 60_000)

  await prisma.otp.create({
    data: {
      email: email,
      otp: otpHash,
      expiresAt: expireAt
    }
  })

  try {
    await sendEmail({
      to: email,
      subject: "FUMA - OTP for auth verification",
      html: purpose == "login" ? loginEmailTemplate(otp) : signupEmailTemplate(otp)
    });

    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to send OTP" });
  }


}

export const getDetails = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const id = req.id
    if (!id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const data = await prisma.users.findFirst({
      where: { id }
    })
    res.json({ data })
  } catch (err) {
    console.error("Get details error:", err);
    res.status(500).json({ message: "Server error" });
  }
}


// --- configure passport strategy here (no sessions; we issue our own JWT) ---
passport.use(
  new GoogleStrategy(
    {
      // @ts-ignore
      clientID: process.env.GOOGLE_CLIENT_ID,
      // @ts-ignore
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    // verify callback
    async (_accessToken: string, _refreshToken: string, profile: Profile, done: any) => {
      try {
        const email =
          profile.emails && profile.emails[0]?.value
            ? profile.emails[0].value.toLowerCase()
            : "";

        if (!email) return done(new Error("Google did not return an email"));

        const avatar =
          profile.photos && profile.photos[0]?.value ? profile.photos[0].value : null;
        const username = profile.displayName || null;

        let user = await prisma.users.findUnique({ where: { email } });

        if (!user) {
          user = await prisma.users.create({
            data: {
              email,
            },
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err as Error);
      }
    }
  )
);

export const passportGoogle = passport;

function setAuthCookie(res: any, userId: string) {
  const JWT_SECRET = Buffer.from(process.env.JWT_SECRET || "");
  const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });

  res.cookie("token", token, {
    httpOnly: false, // (recommend true in production; keep to match your current behavior)
    secure: process.env.NODE_ENV !== "development",
    maxAge: 1000 * 60 * 60,
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
  });
}

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false,
});

export const googleAuthCallback = (req: any, res: any, next: any) => {
  passport.authenticate("google", { session: false }, (err, user) => {
    if (err || !user) {
      console.error("Google auth error:", err);
      return res.redirect("/auth/google/failure");
    }
    // user is the Prisma user object returned in the strategy
    setAuthCookie(res, user.id);
    return res.redirect(process.env.FRONTEND_SUCCESS_URL);
  })(req, res, next);
};
