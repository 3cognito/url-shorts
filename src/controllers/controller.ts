import { Request, Response } from "express";
import shortUrl from "../models/random-url";

const shorten = async (req: Request, res: Response) => {
  try {
    const { destination } = req.body;
    const urlExists = await shortUrl.findOne({ destination });
    if (urlExists) return res.status(200).send({ link: urlExists.shortUrl });
    const short = new shortUrl({ destination });
    await short.save();
    res.status(200).send({ link: short.shortUrl });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "something went wrong" });
  }
};

const direct = async (req: Request, res: Response) => {
  try {
    const shortId = req.params.id;
    const origin = await shortUrl.findOne({ shortId });
    if (!origin) return res.status(404).send({ message: "Page not found" });
    res.redirect(`https://${origin.destination}`);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "something went wrong" });
  }
};

//Controller for a customizable short
const customize = async (req: Request, res: Response) => {
  const { destination, customizedUrl } = req.body;
  const urlExists = await shortUrl.findOne({ shortUrl: customizedUrl });
  if (urlExists) return res.status(404).send({ message: "url is taken" });
};
export { shorten, direct };
