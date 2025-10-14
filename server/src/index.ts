import express from "express"
import authRouter from "./routes/auth"
import { Client, Connection } from "pg"
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
const app = express()
express.json()
app.use(express.json())


app.use(cors({
  origin: "http://localhost:5173",
//   credentials: true,                 // set to false if you don't use cookies/auth headers
}));

// --------------- routes ---------
app.use("/api/v1/auth", authRouter)

app.listen(process.env.PORT || 8080 , () => {
    console.log("server running on ", process.env.PORT);
})

