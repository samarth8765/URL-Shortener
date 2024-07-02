import { Router } from "express";
import {
  createNewURL,
  deleteURL,
  getAllUrls,
  getUrl,
} from "../controller/urlController";
import { authMiddlware } from "../middlewares/authMiddleware";

const urlRoutes = Router();

urlRoutes.get("/", authMiddlware, getAllUrls);
urlRoutes.get("/:url", authMiddlware, getUrl);
urlRoutes.post("/", authMiddlware, createNewURL);
urlRoutes.delete("/:shortURL", authMiddlware, deleteURL);

export { urlRoutes };
