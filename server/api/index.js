// api/index.js  (Vercel serverless wrapper - no app.listen here)
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import serverless from "serverless-http";

// load env locally; on Vercel they come from dashboard
if (!process.env.VERCEL) {
  const dotenv = await import("dotenv");
  dotenv.config();
}

// ---- import your existing routes/controllers from src ----
import { webhook } from "../src/routes/webhook.js";
import authRouter from "../src/routes/auth.js";
import instaRouter from "../src/routes/instagram.js";
import igroute from "../src/routes/ig.js";
import { passportGoogle } from "../src/controllers/authController.js";
import automationRoute from "../src/routes/automation.js";
import subscriptioinRouter from "../src/routes/subscription.js";

const app = express();
app.set("trust proxy", 1);

// cookies first
app.use(cookieParser());

// keep raw ONLY for /webhook (before json)
app.use("/webhook", express.raw({ type: "*/*" }));

// json for everything else
app.use(express.json({ limit: "50mb" }));

// passport
app.use(passportGoogle.initialize());

// CORS
const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const allowAll = allowedOrigins.length === 0;

app.use(
  cors({
    origin(origin, cb) {
      if (allowAll) return cb(null, true);
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ---- routes same as your src/index.ts (no app.listen) ----
app.get("/", (_req, res) => {
  res.type("html").send("<p>Hello, World!</p>");
});

app.get("/privacy_policy", (_req, res) => {
  const company = process.env.COMPANY_NAME || "Your Company";
  const contactEmail = process.env.CONTACT_EMAIL || "support@example.com";
  const companyAddress = process.env.COMPANY_ADDRESS || "Your Address";
  const lastUpdated = process.env.PP_LAST_UPDATED || "January 18, 2025";

  res
    .status(200)
    .type("html")
    .send(`<!doctype html><html><head><meta charset="utf-8"/>
      <title>Privacy Policy</title></head><body>
      <h1>Privacy Policy</h1>
      <p>Last updated: ${lastUpdated}</p>
      <p>Company: ${company}</p>
      <p>Contact: <a href="mailto:${contactEmail}">${contactEmail}</a></p>
      <p>Address: ${companyAddress}</p>
    </body></html>`);
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/instagram", instaRouter);
app.use("/api/v1/ig", igroute);
app.use("/api/v1/automation", automationRoute);
app.use("/api/v1/subscriptions", subscriptioinRouter);

// webhook (raw body set above)
app.all("/webhook", webhook);

// ---- export serverless handler for Vercel ----
export default serverless(app);
