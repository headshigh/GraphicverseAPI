const tshirtdesigns = require("../models/tshirtdesigns.js");
const instagramposts = require("../models/instagramposts");
const banners = require("../models/banners");
const socialnetworks = require("../models/socialnetworks");
const flyers = require("../models/flyers");
const backgrounds = require("../models/backgrounds");
const logos = require("../models/logos");
const festivals = require("../models/festivals");
const mongoose = require("mongoose");
const multer = require("multer");
const fake = require("../models/fake");
const upload = require("../upload");
const jwt = require("jsonwebtoken");

const getAllData = async (req, res) => {
  //must send page as query to limit the data sent to 31 else if page is not defined all th data will be sent coz it is required in row component
  var datatofetch = req.params.design;
  var graphic = eval(datatofetch);
  console.log(graphic);
  const page = req.query.page;
  const dataperpage = req.query.dataperpage || 31;
  const skip = dataperpage * (page - 1);
  try {
    const output = graphic.find({});
    var result1;
    if (req.query.page) {
      result1 = output.skip(skip).limit(dataperpage);
    } else {
      result1 = await output;
    }
    console.log(req.query.page);
    const count = await graphic.countDocuments({});
    // console.log(count);
    const result = await result1;
    if (result) {
      res.status(200).json({ msg: result, count: count });
    }
  } catch (err) {
    res.status(404).json({ msg: err });
  }
};
const getOne = async (req, res) => {
  const cat = req.params.design2;
  console.log(cat);
  const graphic2 = eval(cat);
  // console.log(graphic2);
  const fileid = req.params.fileid;
  // console.log(fileid);
  // var id = eval(fileid);
  try {
    const result = await graphic2.findOne({
      FileId: fileid,
    });
    res.status(200).json({ msg: result });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
const postData = async (req, res) => {
  const type = req.params.type;
  const graph = eval(type);
  var User;
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(req.body.jwt);
      jwt.verify(req.body.jwt, process.env.JWT, (err, user) => {
        if (err) {
          res.status(403).json({ err: "you are not authenticated" });
        } else {
          // console.log(user);
          User = user;
        }
      });
      console.log(User.loggeduser.username);
      // console.log(req.files);
      // console.log(req.body.Name);

      const newimage = graph
        .create({
          Name: req.body.Name,
          uploader: User.loggeduser.username,
          Image: {
            data: req.files[0].filename,
            contentType: "image/png",
          },
          Psd: {
            data: req.files[0].filename,
            // data: req.files["testImage"][1].filename,
          },
        })
        .then(() => res.send("sucessful"))

        .catch((err) => console.log(err));
    }
  });
};
module.exports = { getAllData, getOne, postData };
