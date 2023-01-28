import { Request, Response } from "express";
import shortUrl from "../models/short-url";

const shorten = async (req: Request, res: Response) => {
  try {
    const { destination } = req.body;
    const short = new shortUrl({ destination });
    await short.save();
    res.status(200).send({ link: short.shortUrl });
  } catch (err) {
    console.log(err);
  }
};

const direct = async (req: Request, res: Response) => {
  const shortId = req.params.id;
  const origin = await shortUrl.findOne({ shortId });
  console.log(origin);
  if (origin) return res.redirect(`https://${origin?.destination}`);
};

export { shorten, direct };
