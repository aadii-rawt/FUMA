"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const authRouter = (0, express_1.Router)();
authRouter.post("/login", authController_1.login);
authRouter.post("/login/verify", authController_1.verifyLoginOTP);
authRouter.post("/signup", authController_1.signup);
authRouter.post("/signup/verify", authController_1.verifySignupOTP);
authRouter.get("/me", auth_1.auth, authController_1.getDetails);
authRouter.get("/google", authController_1.googleAuth);
authRouter.get("/google/callback", authController_1.googleAuthCallback);
authRouter.post("/logout", authController_1.logout);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map