import { Router } from "express";
import { auth } from "../middleware/auth";
import { automationCount, createAutomation, getAutomation, linkRedirect, stopAutomation, updateAutomation } from "../controllers/automationController";

const automationRoute = Router()

automationRoute.get("/",auth, getAutomation)
automationRoute.post("/", auth, createAutomation)
automationRoute.get("/count", auth, automationCount)
automationRoute.put("/:id", auth, updateAutomation)
automationRoute.get("/track/:id", linkRedirect)


export default automationRoute