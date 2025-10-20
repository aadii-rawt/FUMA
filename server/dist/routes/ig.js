"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const igController_1 = require("../controllers/igController");
const auth_1 = require("../middleware/auth");
const igroute = (0, express_1.Router)();
igroute.get("/media", auth_1.auth, igController_1.getPost);
exports.default = igroute;
//# sourceMappingURL=ig.js.map