import { Express } from "express-serve-static-core";
import { direct, shorten } from "./controller";

const routes = (app: Express) => {
  app.post("/shorten", shorten);
  app.get("/:id", direct);
};
export default routes;
