import express from "express";
import routes from "./routes";
import cors from "cors";
import db from "./db";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  //connect to db
  db();
  //initialize routes
});
