import express from "express";
import routes from "./routes/routes";
import cors from "cors";
import db from "./db/db";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  //connect to db
  db();
  //initialize routes
  routes(app);
});
