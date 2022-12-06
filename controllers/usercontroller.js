const user = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, name, email, password } = req.body;
  console.log(req.body);
  try {
    if (!username) {
      return res.status(500).json({ msg: "Please enter username" });
    }
    if (!name) {
      return res.status(500).json({ msg: "Please enter username" });
    }
    if (!email) {
      return res.status(500).json({ msg: "Please enter email" });
    }
    if (!password) {
      return res.status(500).json({ msg: "Please enter password" });
    } else {
      const hashedpassword = await bcrypt.hash(req.body.password, 10);
      // console.log("hi");
      const newuser = await user.create({
        username: username,
        email: email,
        isVerified:false,
        fullname: name,
        password: hashedpassword,
      });
      if (newuser) {
        return res.status(200).json({ msg: newuser });
      }
    }
  } catch (err) {
    if (err.code == "11000") {
      if (err.keyPattern.username) {
        return res.status(500).json({ err: "username already in use" });
      }
      if (err.keyPattern.email) {
        return res.status(500).json({ err: "email already in use" });
      }
    } else {
      console.log(err);
      return res.status(500).json({ err: "unable to register account" });
    }
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const loggeduser = await user.findOne({ username: username });
    if (!loggeduser) {
      res.status(500).json({ msg: "Username not found" });
    } else {
      if (!(await bcrypt.compare(password, loggeduser.password))) {
        res.status(500).json({ msg: "Wrong Password" });
      } else {
        const token = jwt.sign({ loggeduser }, process.env.JWT);
        return res.status(200).json({ token: token });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = { login, register };
