"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashBoardRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const dashBoardController_1 = require("../controller/dashBoardController");
const dashBoardRouter = (0, express_1.Router)();
exports.dashBoardRouter = dashBoardRouter;
dashBoardRouter.get("/", authMiddleware_1.authMiddlware, dashBoardController_1.dashBoardController);
