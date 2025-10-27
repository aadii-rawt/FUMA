// api/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import serverless from "serverless-http";

import { webhook } from "./routes/webhook";
import authRouter from "./routes/auth";
import instaRouter from "./routes/instagram";
import igroute from "./routes/ig";
import { passportGoogle } from "./controllers/authController";
import automationRoute from "./routes/automation";
import subscriptioinRouter from "./routes/subscription"; dotenv.config();
dotenv.config();

const app = express();

/**
 * IMPORTANT ORDER:
 * - raw body ONLY for /webhook
 * - then JSON parser for the rest
 */
app.use("/webhook", express.raw({ type: "*/*" }));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(passportGoogle.initialize());

const allowedOrigins = [process.env.CORS_ORIGIN].filter(Boolean) as string[];

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.get("/", (_req, res) => {
  res.type("html").send("<p>Hello, World!</p>");
});

// Serve privacy policy at both slugs
const privacyHandler = (_req: express.Request, res: express.Response) => {
  const company = process.env.COMPANY_NAME || "Your Company";
  const contactEmail = process.env.CONTACT_EMAIL || "support@example.com";
  const companyAddress = process.env.COMPANY_ADDRESS || "Your Address";
  const lastUpdated = process.env.PP_LAST_UPDATED || "January 18, 2025";

  const html = `<!doctype html><html><head><meta charset="utf-8"/><title>Privacy Policy</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta name="robots" content="noindex, nofollow"/>
  <style>:root{--text:#111827;--muted:#374151;--bg:#fff;--hr:#e5e7eb}
  html,body{margin:0;padding:0;background:var(--bg);color:var(--text);font-family:ui-serif,Georgia,serif;line-height:1.6}
  .container{max-width:960px;margin:48px auto;padding:0 20px}h1{font-size:clamp(34px,5vw,56px);margin:0 0 16px;font-weight:800}
  h2{font-size:clamp(26px,3.2vw,36px);margin:32px 0 12px;font-weight:800}h3{font-size:clamp(18px,2.2vw,22px);margin:20px 0 8px;font-weight:800}
  p,li{font-size:18px;color:var(--muted)}ul{padding-left:22px}hr{border:0;border-top:1px solid var(--hr);margin:26px 0}
  .small{font-size:14px;color:#6b7280}.badge{display:inline-block;padding:2px 8px;border:1px solid var(--hr);border-radius:999px;font-size:12px;color:#4b5563}
  a{color:#2563eb;text-decoration:none}a:hover{text-decoration:underline}</style></head>
  <body><div class="container"><h1>Privacy Policy</h1>
  <p class="small">Last updated: <strong>${lastUpdated}</strong></p>
  <p>This Privacy Policy describes the policies and procedures of <strong>${company}</strong> …</p>
  <h2>Collecting and Using Your Personal Data</h2>
  <p><span class="badge">Personal Data</span> …</p>
  <hr/><h3>Contact Us</h3><p>Email: <a href="mailto:${contactEmail}">${contactEmail}</a><br/>Address: ${companyAddress}</p>
  <hr/><p class="small">This template is informational and not legal advice.</p></div></body></html>`;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
};
app.get("/privacy_policy", privacyHandler);
app.get("/privacy-policy", privacyHandler);

// NOTE: Because this file lives under /api, your public URLs will be:
//   /api/api/v1/auth, /api/api/v1/instagram, etc.
// If you want plain /api/v1/* on the public URL, change the mounts below to "/v1/*".
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/instagram", instaRouter);
app.use("/api/v1/ig", igroute);
app.use("/api/v1/automation", automationRoute);
app.use("/api/v1/subscriptions", subscriptioinRouter);
app.all("/webhook", webhook);

// ✅ Export a serverless handler (DO NOT app.listen on Vercel)
export default serverless(app);
