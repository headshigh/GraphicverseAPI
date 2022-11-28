const express = require("express");
const app = express();
const mongoose = require("mongoose");
const route = require("./routes/data");
app.use(express.json());
var cors = require("cors");
app.use(cors());
const connectDB = require("./connect");
app.use("/api", route);
require("dotenv").config();

const start = async () => {
  try {
    connectDB(process.env.MONGO);
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
};
start();
