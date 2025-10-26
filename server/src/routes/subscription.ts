import { Router } from "express";
import { auth } from "../middleware/auth";
import { createSubscription, getSubscriptionDetails, subscriptionExpire } from "../controllers/subscriptionController";

const subscriptioinRouter = Router()

subscriptioinRouter.get("/history", auth, getSubscriptionDetails )
subscriptioinRouter.post("/confirm" , auth, createSubscription)
subscriptioinRouter.put("/expire" , auth, subscriptionExpire)


export default subscriptioinRouter