import express from "express"
import authRouter from "./routes/auth"
import { Client, Connection } from "pg"
import dotenv from 'dotenv'
dotenv.config()
const app = express()
express.json()
app.use(express.json())
// --------------- routes ---------
app.use("/api/v1/auth", authRouter)

app.listen(process.env.PORT || 8080 , () => {
    console.log("server running on ", process.env.PORT);
})

