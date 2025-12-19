import {Router} from "express"
import { auth } from "../middleware/auth"
import { getMessageStats, userStats } from "../controllers/statsController"
const statsRouter = Router()

statsRouter.get("/basic", auth, userStats)
statsRouter.get("/messages", auth, getMessageStats)

export default statsRouter