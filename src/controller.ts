import { Request, Response } from "express";
import shortUrl from "./models/short-url";

const shorten = (req: Request, res: Response) => {
  const { destination } = req.body;
};

const direct = (req: Request, res: Response) => {};

export { shorten, direct };
