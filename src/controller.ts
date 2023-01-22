import { Request, Response } from "express";

const shorten = (req: Request, res: Response) => {
  const { destination } = req.body;
};

const direct = (req: Request, res: Response) => {};

export { shorten, direct };
