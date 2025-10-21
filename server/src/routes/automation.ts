import { Router } from "express";
import { auth } from "../middleware/auth";
import { createAutomation, getAutomation } from "../controllers/automationController";

const automationRoute  = Router()

automationRoute.get("/",getAutomation)
automationRoute.post("/",auth,createAutomation)


export default automationRoute