"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const automationController_1 = require("../controllers/automationController");
const automationRoute = (0, express_1.Router)();
automationRoute.get("/", automationController_1.getAutomation);
automationRoute.post("/", auth_1.auth, automationController_1.createAutomation);
automationRoute.get("/count", auth_1.auth, automationController_1.automationCount);
automationRoute.put("/:id", auth_1.auth, automationController_1.updateAutomation);
automationRoute.put("/stop/:id", auth_1.auth, automationController_1.stopAutomation);
automationRoute.get("/track/:id", automationController_1.linkRedirect);
exports.default = automationRoute;
//# sourceMappingURL=automation.js.map