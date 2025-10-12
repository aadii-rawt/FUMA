import { Router } from "express";
import { login, signup, verifyOTP } from "../controllers/authController";

const authRouter = Router()

authRouter.post("/login",login)
authRouter.post("/signup",signup)
authRouter.get("/verify",verifyOTP)

export default authRouter