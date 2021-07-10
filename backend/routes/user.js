const express = require("express");
const router = express.Router();

const { UserWithEmail, UserWithNumber } = require("../models/user");
const { generateJwtToken, passHash } = require("../utils/user");

// const bcrypt = require("bcrypt");
// const config = require("config");
// const jwt = require("jsonwebtoken");

// function generateJwtToken(payload) {
//   return jwt.sign(payload, config.get("jwtKey"));
// }

// async function passHash(password) {
//   const salt = await bcrypt.genSalt(10);
//   return await bcrypt.hash(password, salt);
// }

router.post("/login", async (req, res) => {
  let user;
  if (req.body.email)
    user = await UserWithEmail.findOne({ email: req.body.email });

  if (req.body.mobileNumber)
    user = await UserWithNumber.findOne({
      mobileNumber: req.body.mobileNumber,
    });

  if (!req.body.email && !req.body.mobileNumber) {
    const userName = await UserWithEmail.findOne({
      userName: req.body.userName,
    });

    if (userName) user = userName;
    else user = await UserWithNumber.findOne({ userName: req.body.userName });
  }

  const token = generateJwtToken(req.body);
  res.status(200).header("x-auth-header", token).send(user);
});

router.post("/signup", async (req, res) => {
  let user = req.body.email
    ? new UserWithEmail(req.body)
    : new UserWithNumber(req.body);
  let result;
  if (
    !(await UserWithEmail.findOne({ userName: user.userName })) &&
    !(await UserWithNumber.findOne({ userName: user.userName }))
  ) {
    user.password = await passHash(user.password);
    await user.save();
  }

  const token = generateJwtToken(req.body);
  res.status(200).header("x-auth-header", token).send();
});

module.exports = router;
