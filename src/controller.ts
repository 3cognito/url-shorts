import { Request, Response } from "express";
import shortUrl from "./models/short-url";

const shorten = async (req: Request, res: Response) => {
  try {
    const { destination } = req.body;
    const short = new shortUrl({ destination });
    await short.save();
    console.log(req);
    res.status(200).send({ link: short.shortUrl });
  } catch (err) {
    console.log(err);
  }
};

const direct = async (req: Request, res: Response) => {};

export { shorten, direct };
