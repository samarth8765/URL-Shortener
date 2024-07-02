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

    // getTotalClicks
    const totalClicks = urls.reduce((prev, curr): number => {
      return prev + curr.TotalClicks;
    }, 0);

    const numberOfLinks = await DB.user.findFirst({
      where: {
        id,
      },
    });

    const response = {
      urls,
      totalClicks,
      numberOfLinks: numberOfLinks?.numberOfLinks,
    };

    return res.status(200).json(response);
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
    console.log(id);
    let { longURL, shortURL, title } = req.body;
    if (!longURL || !title) {
      return res.status(400).json({
        error: "Please send all required fields",
      });
    }

    if (!shortURL) {
      shortURL = await generateUniqueShortID();
    }
    console.log(shortURL);
    const generateURL = await DB.url.create({
      data: {
        userId: id,
        longURL,
        shortURL,
        title,
      },
    });

    // Incrementing count of url
    await DB.user.update({
      where: {
        id: id,
      },
      data: {
        numberOfLinks: {
          increment: 1,
        },
      },
    });

    return res.status(201).json(generateURL);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const deleteURL = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { id } = req.user;
    const { shortURL } = req.params;

    await DB.url.delete({
      where: {
        shortURL,
      },
    });

    // decrementing count of url
    await DB.user.update({
      where: {
        id: id,
      },
      data: {
        numberOfLinks: {
          decrement: 1,
        },
      },
    });

    return res.status(200).json({
      message: "Data Deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server error",
    });
  }
};
