"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute_1 = require("./routes/authRoute");
const cors_1 = __importDefault(require("cors"));
const dashBoardRoutes_1 = require("./routes/dashBoardRoutes");
const urlRoutes_1 = require("./routes/urlRoutes");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/health", (req, res) => {
    const healthCheck = {
        uptime: process.uptime(),
        status: "ok",
    };
    try {
        res.status(200).json(healthCheck);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json(Object.assign(Object.assign({}, healthCheck), { status: "error" }));
    }
});
app.use("/api/auth", authRoute_1.authRoutes);
app.use("/api/dashboard", dashBoardRoutes_1.dashBoardRouter);
app.use("/api/url", urlRoutes_1.urlRoutes);
app.listen(PORT, () => {
    console.log(`Listening at PORT ${PORT}`);
});
