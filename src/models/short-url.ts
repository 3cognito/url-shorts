import mongoose, { Schema, model, connect } from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(String(process.env.CUSTOM_CHARS), 10);

interface IURL {
  shortUrl: string;
  destination: string;
}

const shortSchema = new mongoose.Schema<IURL>({
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
});

const shortUrl = mongoose.model<IURL>("shortURL", shortSchema);

export default shortUrl;
