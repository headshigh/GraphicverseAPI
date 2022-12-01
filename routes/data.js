const express = require("express");
const router = express.Router();
const {
  getAllData,
  getOne,
  postData,
  getuserdata,
} = require("../controllers/datacontroller");
const { verifyToken } = require("../verifytoken");
const { register, login } = require("../controllers/usercontroller");
router.route("/user/:username").get(getuserdata);
// router.route("row/:design").get(getDataRow);
router.route("/:design").get(getAllData);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/upload/:type").post(postData);
// router.route("/:design2/:fileid").get(getOne);
module.exports = router;
