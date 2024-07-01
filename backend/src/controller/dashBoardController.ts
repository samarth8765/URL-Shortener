import { Response, Request } from "express";

export const dashBoardController = (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const data = req.user;
    res.status(200).json({
      username: data.username,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server error",
    });
  }
};
