import { Router } from "express";
import { loginUser, registerUser } from "../controller/authController";

const authRoutes = Router();

authRoutes.post("/signup", registerUser);
authRoutes.post("/login", loginUser);

export { authRoutes };
