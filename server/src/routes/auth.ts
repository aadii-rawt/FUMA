import { Router } from "express";
import { getDetails, googleAuth, googleAuthCallback, login, signup, verifyLoginOTP, verifySignupOTP } from "../controllers/authController";
import { auth } from "../middleware/auth";

const authRouter = Router()

authRouter.post("/login",login)
authRouter.post("/login/verify",verifyLoginOTP)

authRouter.post("/signup",signup)
authRouter.post("/signup/verify",verifySignupOTP)
authRouter.get("/me",auth, getDetails)
authRouter.get("/google", googleAuth);
authRouter.get("/google/callback", googleAuthCallback);

export default authRouter