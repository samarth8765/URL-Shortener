import { Response, Request, NextFunction, json } from "express";
import jwt from "jsonwebtoken";
import { DBClient } from "../model/prisma";

const DB = DBClient.getInstance();

interface JwtPayload {
  id: string;
}

export const authMiddlware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer")) {
    try {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      const user = await DB.user.findFirst({
        where: {
          id: decoded.id,
        },
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      //@ts-ignore
      req.user = user;
      next();
    } catch (error: any) {
      console.error(error.message);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
