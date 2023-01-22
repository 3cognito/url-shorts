import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(process.env.CUSTOM_CHARS, 10);

const shortSchema = new mongoose.Schema({
  shortUrl: {
    type: String,
    unique: true,
    required: [true, "short url needs to be saved"],
    default: nanoid(),
  },
  destination: {
    type: String,
    required: [true, "Destination url needs to be passed"],
  },
  createdAt: Date,
});

const shortUrl = mongoose.model("shortURL", shortSchema);

export default shortUrl;
