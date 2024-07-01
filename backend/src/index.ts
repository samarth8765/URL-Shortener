import express from "express";
import { authRoutes } from "./routes/authRoute";
import cors from "cors";
import { dashBoardRouter } from "./routes/dashBoardRoutes";
import { urlRoutes } from "./routes/urlRoutes";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    status: "ok",
  };
  try {
    res.status(200).json(healthCheck);
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({
      ...healthCheck,
      status: "error",
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashBoardRouter);
app.use("/api/url", urlRoutes);

app.listen(PORT, () => {
  console.log(`Listening at PORT ${PORT}`);
});
