"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const automationController_1 = require("../controllers/automationController");
const automationRoute = (0, express_1.Router)();
automationRoute.get("/", automationController_1.getAutomation);
automationRoute.post("/", auth_1.auth, automationController_1.createAutomation);
exports.default = automationRoute;
//# sourceMappingURL=automation.js.map