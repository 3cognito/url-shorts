import mongoose from "mongoose";
import validator from "validator";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  10
);

interface IURL {
  shortUrl: string;
  destination: string;
}

const shortSchema = new mongoose.Schema<IURL>({
  shortUrl: {
    type: String,
    unique: true,
  },
  destination: {
    type: String,
    required: [true, "Destination url needs to be passed"],
    validate: validator.isURL,
  },
});

shortSchema.pre("save", function (next) {
  let short = nanoid();
  this.set("shortUrl", short);
  next();
});

const shortUrl = mongoose.model<IURL>("shortURL", shortSchema);

export default shortUrl;
