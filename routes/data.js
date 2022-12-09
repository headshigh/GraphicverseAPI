const express = require("express");
const router = express.Router();
const {
  getAllData,
  getOne,
  postData,
  getuserdata,
  del,
  uploadprofilepic,
} = require("../controllers/datacontroller");
const { verifyToken, verifyTokenAndOwner } = require("../verifytoken");
const { register, login } = require("../controllers/usercontroller");
router.route("/user/:username").get(getuserdata).post(uploadprofilepic);

router.route("/delete/:id").delete(verifyToken, del);
// router.route("row/:design").get(getDataRow);
router.route("/register").post(register);
router.route("/:design").get(getAllData);
router.route("/login").post(login);
router.route("/upload/:type").post(postData);
router.route("/:design2/:fileid").get(getOne);
module.exports = router;
