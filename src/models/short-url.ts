import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const shortSchema = new mongoose.Schema({
  shortUrl: {
    type: String,
    unique: true,
    required: [true, "short url needs to be saved"],
  },
  destination: {
    type: String,
    required: [true, "Destination url needs to be passed"],
  },
  createdAt: Date,
});

const shortUrl = mongoose.model("shortURL", shortSchema);

export default shortUrl;
