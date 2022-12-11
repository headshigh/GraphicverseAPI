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
const { upload, upload2 } = require("../upload");
const jwt = require("jsonwebtoken");
const { FSWatcher } = require("vite");
const fs = require("fs");
const path = require("path");
const User = require("../models/users");

// const getDataRow = async (req, res) => {
//   var datatofetch = req.params.design;
//   var graphic = eval(datatofetch);
//   console.log(graphic);
//   const count = await graphic.countDocuments({});
//   const skip = Math.floor(Math.random() * count);
//     const output = graphic.find({});
//     var result;
//     console.log("row");
//     result = await output.skip(skip).limit(30);
//     if (result) {
//       res.status(200).json({ msg: result });
//     }

//   }
// };

const getAllData = async (req, res) => {
  //must send page as query to limit the data sent to 31 else if page is not defined all th data will be sent coz it is required in row component
  var datatofetch = req.params.design;
  var graphic = eval(datatofetch);
  console.log(graphic);
  const count2 = await graphic.countDocuments({});

  const page = req.query.page;
  const dataperpage = req.query.dataperpage || 31;
  const skip = dataperpage * (page - 1);
  const skip2 = Math.floor(Math.random() * count2);
  try {
    var output;
    if (req.query.row) {
      output = graphic.find({});
      var result2;
      console.log("row");
      result2 = await output.skip(skip2).limit(30);
      if (result2) {
        return res.status(200).json({ msg: result2 });
      }
    } else {
      output = graphic.find({});
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
        return res.status(200).json({ msg: result, count: count });
      }
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
  console.log(fileid.slice(3));
  var result;
  // console.log(fileid);
  // var id = eval(fileid);
  try {
    if (fileid.slice(0, 2) == "id") {
      result = await graphic2.findOne({ _id: fileid.slice(3) });
      res.status(200).json({ msg: result });
    } else {
      result = await graphic2.findOne({
        FileId: fileid,
      });
      res.status(200).json({ msg: result });
    }
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
const uploadprofilepic = async (req, res) => {
  try {
    var User2;
    upload2(req, res, (err) => {
      if (err) {
        console.log(err);
        console.log("hi");
      } else {
        // console.log(req.body.jwt);
        jwt.verify(req.body.jwt, process.env.JWT, (err, user) => {
          if (err) {
            res.status(403).json({ err: "you are not authenticated" });
          } else {
            console.log(user);
            User2 = user;
          }
        });
        console.log(req.file);
        // console.log(path.join(__dirname, "..", "uploads", req.file.filename));
        // console.log(req.file.filename);
        const result = User.findOneAndUpdate(
          { username: req.params.username },
          {
            profilepic: {
              data: fs.readFileSync(
                path.join(__dirname, "..", "uploads", req.file.filename)
              ),
            },
          },
          { new: true, runValidators: true }
        )
          .then((result) => {
            // console.log(result);
            res.status(200).json({ result });
          })
          .catch((err) => res.status(401).json({ err }));
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ err });
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
          console.log(user);
          User = user;
        }
      });
      console.log(path.join(__dirname, "..", "uploads", req.files[0].filename));
      // const file = path.basename(
      //   path.join(__dirname + "../uploads/" + req.files[0].filename)
      // );
      // console.log(file);
      // console.log(req.body.Name);
      console.log(req.files[1].filename.slice(-3));

      const newimage = graph
        .create({
          Name: req.body.Name,
          uploader: User.username,
          Image: {
            data: fs.readFileSync(
              path.join(__dirname, "..", "uploads", req.files[0].filename)
            ),

            // data: fs.readFileSync("uploads"),
            contentType: "image/png",
          },
          category: type,
          Psd: {
            data: fs.readFileSync(
              path.join(__dirname, "..", "uploads", req.files[1].filename)
            ),
            // data: req.files["testImage"][1].filename,
          },
          fileformat:
            req.files[1].filename.slice(-3) == "peg"
              ? "jpeg"
              : req.files[1].filename.slice(-3),
        })
        .then(() => res.send("sucessful"))

        .catch((err) => console.log(err));
    }
  });
};
const getuserdata = async (req, res) => {
  var contributions = [];
  const username = req.params.username;
  console.log(username);
  try {
    // const findFromDb = async (category) => {
    //   const result = await category.find({ uploader: username });
    // };
    // findFromDb(tshirtdesigns)
    const user = await User.findOne({ username: username });
    const finduserdata = (user_name) => {
      let models = [];
      models.push(tshirtdesigns);

      models.push(instagramposts);
      models.push(banners);
      models.push(socialnetworks);
      models.push(festivals);
      models.push(festivals);
      models.push(logos);

      return Promise.all(
        models.map((model) => model.find({ uploader: user_name }))
      );
    };

    if (!user) {
      return res.status(500).json({ err: "user not found" });
    } else {
      finduserdata(username)
        .then((result) => res.status(200).json({ msg: result, user: user }))
        .catch((err) => console.log(err));
    }

    // console.log(contributions);
    // res.status(200).json({ msg: contributions });
  } catch (err) {
    console.log(err);
  }
};
const del = async (req, res) => {
  try {
    const cat = req.body.cat;
    console.log(req.body);
    const graphic = eval(cat);
    console.log("graphic" + graphic);
    console.log("cat" + cat);
    // console.log("body" + req.body);
    console.log("uploader-" + req.body.uploader);
    console.log("jwt-" + req.body.jwt);
    console.log("id-" + req.params.id);
    const data = await graphic.findOne({ _id: req.params.id });
    console.log(data.uploader);
    if (!data) {
      console.log("not found");
      res.status(404).json({ err: "Not found" });
    } else {
      if (data.uploader != req.body.uploader) {
        return res.status(500).json({ err: "not authorized to delete" });
      } else {
        const del = await graphic.findOneAndDelete({ _id: req.params.id });

        if (!del) {
          return res.status(500).json({ msg: "unable to delete" });
        } else {
          return res.status(200).json({ del });
        }
      }
    }
  } catch (err) {
    res.status(404).json({ error: err });
    console.log(err);
  }
};
module.exports = {
  getAllData,
  getOne,
  postData,
  getuserdata,
  del,
  uploadprofilepic,
};
