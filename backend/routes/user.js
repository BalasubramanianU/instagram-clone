const express = require("express");
const router = express.Router();

const { UserWithEmail, UserWithNumber } = require("../models/user");
const {
  generateJwtToken,
  passHash,
  validateSignUpWithEmail,
  validateSignUpWithNumber,
  validateLoginWithEmail,
  validateLoginWithNumber,
  validateLoginWithName,
} = require("../utils/user");

router.post("/login", async (req, res) => {
  let user;
  if (req.body.email) {
    const { error } = validateLoginWithEmail(req.body);
    if (!error) user = await UserWithEmail.findOne({ email: req.body.email });
  }

  if (req.body.mobileNumber) {
    const { error } = validateLoginWithNumber(req.body);
    if (!error)
      user = await UserWithNumber.findOne({
        mobileNumber: req.body.mobileNumber,
      });
  }

  if (!req.body.email && !req.body.mobileNumber) {
    const { error } = validateLoginWithName(req.body);

    if (!error) {
      const userName = await UserWithEmail.findOne({
        userName: req.body.userName,
      });

      if (userName) user = userName;
      else user = await UserWithNumber.findOne({ userName: req.body.userName });
    }
  }

  const token = generateJwtToken(req.body);
  res.status(200).header("x-auth-header", token).send(user);
});

router.post("/signup", async (req, res) => {
  const isEmail = req.body.email ? true : false;

  const { error } = isEmail
    ? validateSignUpWithEmail(req.body)
    : validateSignUpWithNumber(req.body);

  let user;
  if (!error) {
    user = isEmail ? new UserWithEmail(req.body) : new UserWithNumber(req.body);
  }

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
