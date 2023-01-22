import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const shortSchema = new mongoose.Schema({});

const shortUrl = mongoose.model("shortURL", shortSchema);

export default shortUrl;
