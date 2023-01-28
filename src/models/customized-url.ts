import mongoose from "mongoose";
import validator from "validator";

interface IURL {
  customUrl: string;
  destination: string;
}

const customSchema = new mongoose.Schema<IURL>({
  customUrl: {
    type: String,
    unique: true,
    required: true,
    min: 3,
    max: 20,
  },
  destination: {
    type: String,
    required: [true, "Destination url needs to be passed"],
    validate: validator.isURL,
  },
});

const customUrl = mongoose.model<IURL>("customUrl", customSchema);

export default customUrl;
