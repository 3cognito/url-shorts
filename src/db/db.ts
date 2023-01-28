import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const db = async () => {
  try {
    await mongoose.connect(String(process.env.DB_URI));
    console.log("DB connected");
  } catch (err) {
    console.log(err);
  }
};

export default db;
