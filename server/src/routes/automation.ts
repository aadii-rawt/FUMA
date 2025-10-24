import { Router } from "express";
import { auth } from "../middleware/auth";
import { createAutomation, getAutomation, stopAutomation, updateAutomation } from "../controllers/automationController";

const automationRoute  = Router()

automationRoute.get("/",getAutomation)
automationRoute.post("/",auth,createAutomation)
automationRoute.put("/:id", auth, updateAutomation)
automationRoute.put("/stop/:id",auth, stopAutomation)


export default automationRoute