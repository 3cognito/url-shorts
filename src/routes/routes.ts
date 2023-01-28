import { Express } from "express-serve-static-core";
import { customize, direct, shorten } from "../controllers/controller";
import { Request, Response } from "express";

const routes = (app: Express) => {
  app.post("/shorten", shorten);
  app.post("/customize", customize);
  app.get("/:id", direct);
  app.get("/", async (req: Request, res: Response) => {
    res.send("Home page");
  });
};
export default routes;
