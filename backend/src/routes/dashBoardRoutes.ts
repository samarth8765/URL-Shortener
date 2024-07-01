import { Router } from "express";
import { authMiddlware } from "../middlewares/authMiddleware";
import { dashBoardController } from "../controller/dashBoardController";

const dashBoardRouter = Router();

dashBoardRouter.get("/", authMiddlware, dashBoardController);

export { dashBoardRouter };
