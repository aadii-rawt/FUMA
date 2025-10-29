import { Router } from "express";
import { auth } from "../middleware/auth";
import { automationCount, createAutomation, getAutomation, linkRedirect, stopAutomation, updateAutomation } from "../controllers/automationController";
import planValidation from "../middleware/planValidatin";

const automationRoute  = Router()

automationRoute.get("/",getAutomation)
automationRoute.post("/",auth, createAutomation)
automationRoute.get("/count",auth, automationCount)
automationRoute.put("/:id", auth, updateAutomation)
automationRoute.put("/stop/:id",auth, stopAutomation)
automationRoute.get("/track/:id", linkRedirect)


export default automationRoute