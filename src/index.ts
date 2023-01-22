import express from "express";
import routes from "./routes";
import cors from "cors";

const app = express();

app.use(cors());

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  //connect to db
  //initialize routes
});
