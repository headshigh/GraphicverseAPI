const { response } = require("express");
const JWT = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log(req.body);
  console.log(req.body.jwt);
  JWT.verify(req.body.jwt, process.env.JWT, (err, user) => {
    if (err) {
      res.status(403).json({ err: "you are not authenticated" });
    } else {
      next();
    }
  });
};
const verifyTokenAndOwner = (req, res, next) => {};
module.exports = { verifyToken, verifyTokenAndOwner };
