import { DBClient } from "../model/prisma";
import { Request, Response } from "express";
import { compare, hash } from "bcrypt";
import { generateToken } from "../utils/generateToken";

const DB = DBClient.getInstance();

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email or Password not found" });
  }

  const userExists = await DB.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    return res.status(409).json({
      error: "Email already exists",
    });
  }

  const hashPassword = await hash(password, 10);

  const user = await DB.user.create({
    data: {
      email,
      username,
      password: hashPassword,
    },
  });

  return res.status(201).json({
    message: "User created successfully",
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({ error: "Email or Password not found" });
  }

  const user = await DB.user.findFirst({
    where: {
      email,
    },
  });

  if (user && (await compare(password, user.password))) {
    res.json({
      email,
      token: generateToken(user.id),
    });
  } else {
    res.status(401).json({
      error: "Invalid email or password",
    });
  }
};
