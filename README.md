# 🚀 FUMA — Instagram Auto-DM & Automation Platform (Meta Graph API)

FUMA is a modern automation platform enabling Instagram Business accounts to automate DMs, comment replies, and engagement workflows via the **Meta Graph API**.

> 🧠 Built with:
> - **React + TypeScript + Vite** (Client)
> - **Node.js + Express + TypeScript + Prisma + PostgreSQL** (Server)

---

## 🧰 Prerequisites

- Node.js ≥ 18.x  
- PostgreSQL ≥ 13  
- pnpm / npm / yarn  
- Meta for Developers account  
- An Instagram **Business/Professional** account connected to a **Facebook Page**

---

## 🔑 Step 1: Get Meta (Facebook) API Credentials

This section explains how to create and configure your **Meta App** for Instagram Graph API access.

### 🪪 A. Prepare Your Accounts

1. Create a **Facebook Page** (if not already).
2. Switch your Instagram account to a **Professional (Business)** account.
3. Link your **Instagram account** to your **Facebook Page**:
   - Go to Instagram → Settings → Linked Accounts → Meta → Connect Facebook Page.

---

### 🧩 B. Create a Meta App

1. Visit [Meta for Developers](https://developers.facebook.com/).
2. Click **My Apps → Create App**.
3. Choose **Business** as the app type.
4. Fill in:
   - **App Name**
   - **Contact Email**
   - **Business Manager**
5. After creation, note down:
   - **App ID**
   - **App Secret**

---

### ⚙️ C. Add Products & Configure OAuth

1. In your Meta App, go to **Add Products** → Add:
   - **Instagram Graph API**
   - **Facebook Login**
   - **Webhooks**
2. Under **Facebook Login → Settings**:
   - Add your **OAuth redirect URL**:
     ```
     http://localhost:4000/auth/callback
     ```
   - For production:
     ```
     https://yourdomain.com/auth/callback
     ```
3. Under **App Settings → Basic**:
   - Add your **App Domain** (client/server URLs)
   - Add **Privacy Policy** & **Terms of Service URLs**

---

### 🔒 D. Request Required Permissions

For DMs, comments, and publishing, request these permissions:


> In development mode, only app roles (Admin/Developer/Tester) can log in.  
> For production, submit your app for **App Review** with test credentials and demo video.

---

### 🔁 E. Generate Access Tokens

1. Use **Facebook Login** to get a short-lived user token.
2. Exchange it for a **long-lived user token** via your backend.
3. Retrieve **Page Access Tokens** using `/me/accounts`.
4. Get your **Instagram Business Account ID** via:

5. Use that ID for all Instagram Graph API requests.

---

### 📡 F. Set Up Webhooks

1. In **App Dashboard → Webhooks**:
- Add **Instagram** product.
- Callback URL:  
  ```
  https://yourdomain.com/webhooks/meta
  ```
- Verify Token:  
  ```
  fuma_verify_token
  ```
2. Subscribe to:
- `messages`
- `comments`
- `mentions`
- `story_insights` (optional)

---

## ⚙️ Step 2: Environment Variables

### 🔹 Server (`server/.env`)
```env
NODE_ENV=development
PORT=4000
SERVER_URL=http://localhost:4000
CLIENT_URL=http://localhost:5173

# Database
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/fuma?schema=public"

# JWT & Webhook
JWT_SECRET=your_jwt_secret
WEBHOOK_VERIFY_TOKEN=fuma_verify_token

# Meta App
META_APP_ID=YOUR_META_APP_ID
META_APP_SECRET=YOUR_META_APP_SECRET
OAUTH_REDIRECT_URI=http://localhost:4000/auth/callback


