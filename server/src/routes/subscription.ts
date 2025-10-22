import { Router } from "express";
import { auth } from "../middleware/auth";
import { createSubscription, getSubscriptionDetails } from "../controllers/subscriptionController";

const subscriptioinRouter = Router()

subscriptioinRouter.get("/", auth, getSubscriptionDetails )
subscriptioinRouter.post("/confirm" , auth, createSubscription)


export default subscriptioinRouter