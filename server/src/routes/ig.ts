import { Router } from "express";
import { getPost } from "../controllers/igController";
const igroute = Router()

igroute.get("/media",getPost)

export default igroute