"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// api/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const webhook_1 = require("./routes/webhook");
const auth_1 = __importDefault(require("./routes/auth"));
const instagram_1 = __importDefault(require("./routes/instagram"));
const ig_1 = __importDefault(require("./routes/ig"));
const authController_1 = require("./controllers/authController");
const automation_1 = __importDefault(require("./routes/automation"));
const subscription_1 = __importDefault(require("./routes/subscription"));
dotenv_1.default.config();
dotenv_1.default.config();
const app = (0, express_1.default)();
/**
 * IMPORTANT ORDER:
 * - raw body ONLY for /webhook
 * - then JSON parser for the rest
 */
app.use("/webhook", express_1.default.raw({ type: "*/*" }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(authController_1.passportGoogle.initialize());
const allowedOrigins = [process.env.CORS_ORIGIN].filter(Boolean);
app.use((0, cors_1.default)({
    origin(origin, cb) {
        if (!origin)
            return cb(null, true);
        if (allowedOrigins.includes(origin))
            return cb(null, true);
        cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));
app.get("/", (_req, res) => {
    res.type("html").send("<p>Hello, World!</p>");
});
// Serve privacy policy at both slugs
const privacyHandler = (_req, res) => {
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
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1/instagram", instagram_1.default);
app.use("/api/v1/ig", ig_1.default);
app.use("/api/v1/automation", automation_1.default);
app.use("/api/v1/subscriptions", subscription_1.default);
app.all("/webhook", webhook_1.webhook);
// ✅ Export a serverless handler (DO NOT app.listen on Vercel)
exports.default = (0, serverless_http_1.default)(app);
//# sourceMappingURL=index.js.map