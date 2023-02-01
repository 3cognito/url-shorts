import { Express } from "express-serve-static-core";
import {
  customize,
  direct,
  shorten,
  editShort,
} from "../controllers/controller";
import { Request, Response } from "express";

const routes = (app: Express) => {
  //To randomly shorten a url
  app.post("/shorten", shorten);
  //To customise a short
  app.post("/customize", customize);
  //To edit a url - can only edit a customised short
  app.patch("/edit", editShort);
  //Redirect
  app.get("/:id", direct);
  //Home page
  app.get("/", async (req: Request, res: Response) => {
    res.send("Home page");
  });
};
export default routes;
