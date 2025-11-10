import {Router} from "express"
import { auth } from "../middleware/auth"
import { userStats } from "../controllers/userController"
const userRouter = Router()

userRouter.get("/stats", auth, userStats)

export default userRouter