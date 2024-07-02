import express from "express";
import { authRoutes } from "./routes/authRoute";
import cors from "cors";
import { dashBoardRouter } from "./routes/dashBoardRoutes";
import { urlRoutes } from "./routes/urlRoutes";
import { DBClient } from "./model/prisma";

const DB = DBClient.getInstance();
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

app.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const findURL = await DB.url.update({
      data: {
        TotalClicks: {
          increment: 1,
        },
      },
      where: {
        shortURL: id,
      },
    });

    if (!findURL?.longURL) {
      throw new Error("URL NOT FOUND");
    }

    res.status(302).redirect(findURL.longURL);
  } catch (err) {
    res.status(404).json({
      error: "Not Found",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Listening at PORT ${PORT}`);
});
