const express = require("express");
const router = express.Router();
const {
  getAllData,
  getOne,
  postData,
} = require("../controllers/datacontroller");
const { verifyToken } = require("../verifytoken");
const { register, login } = require("../controllers/usercontroller");
router.route("/:design").get(getAllData);
router.route("/:design2/:fileid").get(getOne);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/upload/:type").post(postData);
module.exports = router;
