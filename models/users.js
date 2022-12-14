const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
    },
    fullname: {
      type: String,
      required: [true, "fullname is required"],
    },
    //changes
    isVerified: {
      type: Boolean,
    },
    profilepic: {
      data: Buffer,
    },
    //
    password: {
      type: String,
      required: [true, "password is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", user);
