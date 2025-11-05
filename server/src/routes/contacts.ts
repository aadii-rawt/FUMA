import { Router } from "express";
import { auth } from "../middleware/auth";
import { getContacts } from "../controllers/contactController";

const contactsRoute = Router()


contactsRoute.get("/", auth, getContacts)

export default contactsRoute