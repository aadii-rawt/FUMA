import { Router } from "express";
import { auth } from "../middleware/auth";
import { automationCount, createAutomation, getAutomation, stopAutomation, updateAutomation } from "../controllers/automationController";
import planValidation from "../middleware/planValidatin";

const automationRoute  = Router()

automationRoute.get("/",getAutomation)
automationRoute.post("/",auth,planValidation, createAutomation)
automationRoute.get("/count",auth, automationCount)
automationRoute.put("/:id", auth, updateAutomation)
automationRoute.put("/stop/:id",auth, stopAutomation)


export default automationRoute