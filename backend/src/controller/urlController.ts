import { User } from "@prisma/client";
import { Request, Response } from "express";
import { DBClient } from "../model/prisma";
import { generateUniqueShortID } from "../utils/shortId";

const DB = DBClient.getInstance();

export const getAllUrls = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = req.user as User;
    const { id } = user;

    //fetch all url's from DB
    const urls = await DB.url.findMany({
      where: {
        userId: id,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const createNewURL = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { id } = req.user as User;

    let { longURL, shortURL, title } = req.body;
    if (!longURL || !title || !shortURL) {
      return res.status(400).json({
        error: "Please send all required fields",
      });
    }

    if (!shortURL) {
      shortURL = await generateUniqueShortID();
    }

    const generateURL = await DB.url.create({
      data: {
        userId: id,
        longURL,
        shortURL,
        title,
      },
    });

    return generateURL;
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
