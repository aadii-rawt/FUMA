import { Router } from "express";
import { connectInsta, login, signup, verifyLoginOTP, verifySignupOTP } from "../controllers/authController";

const authRouter = Router()

authRouter.post("/login",login)
authRouter.post("/login/verify",verifyLoginOTP)

authRouter.post("/signup",signup)
authRouter.post("/signup/verify",verifySignupOTP)

authRouter.post("/connect/instagram", connectInsta)

export default authRouter