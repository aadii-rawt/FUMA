"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const automationController_1 = require("../controllers/automationController");
const planValidatin_1 = __importDefault(require("../middleware/planValidatin"));
const automationRoute = (0, express_1.Router)();
automationRoute.get("/", automationController_1.getAutomation);
automationRoute.post("/", auth_1.auth, planValidatin_1.default, automationController_1.createAutomation);
automationRoute.get("/count", auth_1.auth, automationController_1.automationCount);
automationRoute.put("/:id", auth_1.auth, automationController_1.updateAutomation);
automationRoute.put("/stop/:id", auth_1.auth, automationController_1.stopAutomation);
exports.default = automationRoute;
//# sourceMappingURL=automation.js.map