import { v4 } from "uuid";
import { DBClient } from "../model/prisma";

const DB = DBClient.getInstance();

const checkForShortURL = async (shortURL: string): Promise<boolean> => {
  const url = await DB.url.findFirst({
    where: {
      shortURL,
    },
  });

  return url ? true : false;
};

export const generateUniqueShortID = async () => {
  let count = 10;
  let shortURL = "";
  while (count--) {
    shortURL = v4().slice(0, 7);
    if (!(await checkForShortURL(shortURL))) {
      return shortURL;
    }
  }
  return new Error("Soory, Cannot generate shortURL");
};
