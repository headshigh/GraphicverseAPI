const express = require("express");
const app = express();
const mongoose = require("mongoose");
const route = require("./routes/data");
app.use(express.json({ limit: "5mb" }));
var cors = require("cors");
app.use(cors());
const connectDB = require("./connect");
app.use("/api", route);
require("dotenv").config();
// app.use(express.static("public"));
// var bodyParser = require("body-parser");
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(
//   bodyParser.urlencoded({
//     parameterLimit: 100000,
//     limit: "50mb",
//     extended: true,
//   })
// );

const start = async () => {
  try {
    connectDB(process.env.MONGO).then(() => {
      app.listen(3000, () => {
        console.log("listening on port 3000");
      });
    });
  } catch (err) {
    console.log(err);
  }
};
start();
