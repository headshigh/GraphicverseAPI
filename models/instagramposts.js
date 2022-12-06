const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema(
  {
    FullPath: {
      type: String,
    },
    Name: {
      type: String,
    },
    Image: {
      data: Buffer,
      contentType: String,
    },
    Psd: {
      data: Buffer,
    },
    uploader: {
      type: String,
    },
    FileId: {
      type: String,
      // required: [true, "FIleId must be provided"],
    },
    URL: {
      type: String,
      // required: [true, "URl must be provided"],
    },
    Size: {
      type: Number,
    },
    fileformat: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("instagramposts", dataSchema);
