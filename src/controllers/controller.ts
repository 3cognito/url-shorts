import { Request, Response } from "express";
import shortUrl from "../models/random-url";
import customUrl from "../models/customized-url";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
);

const shorten = async (req: Request, res: Response) => {
  try {
    const { destination } = req.body;
    const urlExists = await shortUrl.findOne({ destination });
    if (urlExists) return res.status(200).send({ link: urlExists.shortUrl });
    const short = new shortUrl({ destination });
    let shortId = nanoid();
    //Ensure there is no conflict with db that stores customised urls
    const otherDbCheck = await customUrl.findOne({ customUrl: shortId });
    if (otherDbCheck) shortId = nanoid();
    short.shortUrl = shortId;
    await short.save();
    res.status(201).send({ link: short.shortUrl });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "something went wrong" });
  }
};

const direct = async (req: Request, res: Response) => {
  try {
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
    //Next two lines ensure no db conflicts
    const urlExists1 = await customUrl.findOne({ customUrl });
    const urlExists2 = await shortUrl.findOne({ customUrl });
    if (urlExists1 || urlExists2)
      return res.status(404).send({ message: "url is taken, enter another" });
    const custom = new customUrl({ destination, customUrl });
    await custom.save();
    res.status(201).send({ link: custom.customUrl });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "something went wrong" });
  }
};

const editShort = async (req: Request, res: Response) => {
  try {
    //Check if the url is of the customizable type
    const { value, newValue } = req.body;
    const editable = await customUrl.findOne({ customUrl: value });
    if (!editable)
      return res.status(400).send({ message: "cannot edit that url" });
    const exists = await customUrl.findOne({ customUrl: newValue });
    if (exists) return res.status(400).send({ message: "url unavailable" });

    const newCustomUrl = await customUrl.findOneAndUpdate(
      { customUrl: newValue },
      { customUrl: newValue },
      { new: true }
    );
    if (newCustomUrl)
      return res.status(200).send({ link: newCustomUrl?.customUrl });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "something went wrong" });
  }
};
export { shorten, direct, customize, editShort };
