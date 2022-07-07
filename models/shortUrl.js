import mongoose from "mongoose";
import shortid from "shortid";

const shortUrlSchema = mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: shortid.generate, // system-generated
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.model("ShortUrl", shortUrlSchema);
