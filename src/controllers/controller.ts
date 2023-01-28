import { Request, Response } from "express";
import shortUrl from "../models/random-url";
import customUrl from "../models/customized-url";

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
    //Potential problem will occur when there are two matches - potential solution would be to create individual routes.
    const shortId = req.params.id;
    const origin1 = await shortUrl.findOne({ shortId });
    const origin2 = await customUrl.findOne({ shortId });
    if (!origin1 && !origin2)
      return res.status(404).send({ message: "Page not found" });
    if (origin1) return res.redirect(`https://${origin1.destination}`);
    if (origin2) return res.redirect(`https://${origin2.destination}`);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "something went wrong" });
  }
};

//Controller for a customizable short
const customize = async (req: Request, res: Response) => {
  try {
    const { destination, customUrl } = req.body;
    const urlExists = await customUrl.findOne({ customUrl });
    if (urlExists)
      return res.status(404).send({ message: "url is taken, enter another" });
    const custom = new customUrl({ destination, customUrl });
    await custom.save();
    res.status(200).send({ link: custom.customUrl });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "something went wrong" });
  }
};
export { shorten, direct, customize };
