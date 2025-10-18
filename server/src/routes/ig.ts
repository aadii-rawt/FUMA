import { Router } from "express";
import { getPost } from "../controllers/igController";
import { auth } from "../middleware/auth";
const igroute = Router()

igroute.get("/media",auth, getPost)

export default igroute