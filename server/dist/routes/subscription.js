"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const subscriptionController_1 = require("../controllers/subscriptionController");
const subscriptioinRouter = (0, express_1.Router)();
subscriptioinRouter.get("/", auth_1.auth, subscriptionController_1.getSubscriptionDetails);
subscriptioinRouter.post("/confirm", auth_1.auth, subscriptionController_1.createSubscription);
exports.default = subscriptioinRouter;
//# sourceMappingURL=subscription.js.map