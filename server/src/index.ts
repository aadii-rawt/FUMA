import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import  { webhook } from "./routes/webhook";
import authRouter from "./routes/auth"; 
import instaRouter from "./routes/instagram";
import cookieParser from "cookie-parser";
import igroute from "./routes/ig";
import { passportGoogle } from "./controllers/authController";
import automationRoute from "./routes/automation";
dotenv.config();

const app = express();

app.use(cookieParser());
app.use("/webhook",express.raw({ type: "*/*" }));
app.use(express.json());
app.use(passportGoogle.initialize());


const allowedOrigins = [
  process.env.CORS_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.get("/", (_req, res) => {
  res.type("html").send("<p>Hello, World!</p>");
});

app.get("/privacy_policy", (_req, res) => {
  const company = process.env.COMPANY_NAME || "Your Company";
  const contactEmail = process.env.CONTACT_EMAIL || "support@example.com";
  const companyAddress = process.env.COMPANY_ADDRESS || "Your Address";
  const lastUpdated = process.env.PP_LAST_UPDATED || "January 18, 2025";

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Privacy Policy</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <style>
    :root{--text:#111827;--muted:#374151;--bg:#fff;--hr:#e5e7eb;}
    html,body{margin:0;padding:0;background:var(--bg);color:var(--text);font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif; line-height:1.6}
    .container{max-width:960px;margin:48px auto;padding:0 20px}
    h1{font-size:clamp(34px,5vw,56px); margin:0 0 16px; font-weight:800}
    h2{font-size:clamp(26px,3.2vw,36px); margin:32px 0 12px; font-weight:800}
    h3{font-size:clamp(18px,2.2vw,22px); margin:20px 0 8px; font-weight:800}
    p, li{font-size:18px; color:var(--muted)}
    ul{padding-left:22px}
    hr{border:0;border-top:1px solid var(--hr);margin:26px 0}
    .small{font-size:14px;color:#6b7280}
    .badge{display:inline-block;padding:2px 8px;border:1px solid var(--hr);border-radius:999px;font-size:12px;color:#4b5563}
    a{color:#2563eb;text-decoration:none} a:hover{text-decoration:underline}
  </style>
</head>
<body>
  <div class="container">
    <h1>Privacy Policy</h1>
    <p class="small">Last updated: <strong>${lastUpdated}</strong></p>

    <p>
      This Privacy Policy describes the policies and procedures of <strong>${company}</strong>
      (“Company”, “we”, “us”, or “our”) on the collection, use, and disclosure of your
      information when you use our website, apps, and related services (the “Service”),
      and explains your privacy rights and how the law protects you. By using the Service,
      you agree to this Privacy Policy.
    </p>

    <h2>Interpretation and Definitions</h2>
    <h3>Interpretation</h3>
    <p>Words with initial capital letters have meanings defined below. These definitions apply whether they appear in singular or plural.</p>
    <h3>Definitions</h3>
    <ul>
      <li><strong>Account</strong>: a unique account created for you to access our Service.</li>
      <li><strong>Personal Data</strong>: any information relating to an identified or identifiable individual.</li>
      <li><strong>Usage Data</strong>: data collected automatically, e.g., IP address, browser type, pages visited.</li>
      <li><strong>Cookies</strong>: small files placed on your device to store certain information.</li>
      <li><strong>Service</strong>: the website and applications operated by ${company}.</li>
    </ul>

    <hr/>

    <h2>Collecting and Using Your Personal Data</h2>
    <h3>Types of Data Collected</h3>
    <p><span class="badge">Personal Data</span></p>
    <p>We may collect your name, email, phone, social profiles connected via OAuth (e.g., Instagram/Facebook), billing and transaction details (for paid plans), and any content you submit.</p>

    <p><span class="badge">Usage Data</span></p>
    <p>Usage Data may include your IP address, browser type/version, pages visited, time and date of visit, time spent on pages, and device identifiers.</p>

    <p><span class="badge">Cookies & Tracking</span></p>
    <p>We use Cookies and similar technologies to operate and improve the Service. You can refuse Cookies in your browser settings, but some parts may not function properly.</p>

    <h3>Use of Your Personal Data</h3>
    <ul>
      <li>To provide, maintain, and improve the Service.</li>
      <li>To manage your Account and provide customer support.</li>
      <li>To process subscriptions, payments, and invoices.</li>
      <li>To operate integrations you authorize (e.g., Meta/Instagram for Auto-DM).</li>
      <li>To communicate updates and security alerts.</li>
      <li>To comply with legal obligations and enforce our terms.</li>
    </ul>

    <h3>Retention</h3>
    <p>We retain Personal Data only as long as necessary for the purposes described, to comply with legal obligations, resolve disputes, and enforce agreements.</p>

    <h3>Transfer</h3>
    <p>Your information may be processed in any location where involved parties are located. We take reasonable steps to ensure an adequate level of data protection.</p>

    <h3>Delete Your Personal Data</h3>
    <p>You can request deletion by emailing <a href="mailto:${contactEmail}">${contactEmail}</a>. We may retain certain information as permitted by law.</p>

    <h3>Disclosure</h3>
    <ul>
      <li><strong>Business Transactions:</strong> e.g., merger, acquisition, or asset sale.</li>
      <li><strong>Legal Requirements:</strong> to comply with law or valid requests by authorities.</li>
      <li><strong>Service Providers:</strong> with vendors (hosting, analytics, payments) under appropriate safeguards.</li>
    </ul>

    <h3>Security</h3>
    <p>We use commercially reasonable measures to protect Personal Data, but no method of transmission or storage is 100% secure.</p>

    <h3>Children’s Privacy</h3>
    <p>The Service is not directed to individuals under 13 (or your local age of consent). We do not knowingly collect data from children.</p>

    <h3>Third-Party Links & Integrations</h3>
    <p>Our Service may include links or integrations (e.g., Meta/Instagram APIs). Their privacy practices are not governed by us; review their policies.</p>

    <h3>Changes to This Privacy Policy</h3>
    <p>We may update this Policy from time to time. We will post the new policy on this page with an updated “Last updated” date.</p>

    <h3>Contact Us</h3>
    <p>
      Email: <a href="mailto:${contactEmail}">${contactEmail}</a><br/>
      Address: ${companyAddress}
    </p>

    <hr/>
    <p class="small">This template is informational and not legal advice. Consult counsel for compliance (e.g., GDPR/DPDP/CCPA).</p>
  </div>
</body>
  </html>`;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/instagram", instaRouter);
app.use("/api/v1/ig", igroute);
app.use("/api/v1/automation", automationRoute);

app.all("/webhook", webhook);


// ----- Start -----
const port = Number(process.env.PORT) || 8080;
app.listen(port, () => console.log("server running on", port));
