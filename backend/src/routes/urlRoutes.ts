import { Router } from "express";
import { createNewURL, getAllUrls } from "../controller/urlController";
import { authMiddlware } from "../middlewares/authMiddleware";

const urlRoutes = Router();

urlRoutes.get("/", authMiddlware, getAllUrls);
urlRoutes.post("/", authMiddlware, createNewURL);

export { urlRoutes };
