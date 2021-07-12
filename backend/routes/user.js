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

const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  let user;
  if (req.body.email) {
    const { error } = validateLoginWithEmail(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    user = await UserWithEmail.findOne({ email: req.body.email });

    if (!user) return res.status(400).send("User does not exist");
  }

  if (req.body.mobileNumber) {
    const { error } = validateLoginWithNumber(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    user = await UserWithNumber.findOne({
      mobileNumber: req.body.mobileNumber,
    });

    if (!user) return res.status(400).send("User does not exist");
  }

  if (!req.body.email && !req.body.mobileNumber) {
    const { error } = validateLoginWithName(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    const userName = await UserWithEmail.findOne({
      userName: req.body.userName,
    });

    if (userName) user = userName;
    else user = await UserWithNumber.findOne({ userName: req.body.userName });

    if (!user) return res.status(400).send("User does not exist");
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  const token = generateJwtToken(req.body);
  res.status(200).header("x-auth-header", token).send(user);
});

router.post("/signup", async (req, res) => {
  const isEmail = req.body.email ? true : false;

  const { error } = isEmail
    ? validateSignUpWithEmail(req.body)
    : validateSignUpWithNumber(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user;
  user = isEmail
    ? await UserWithEmail.findOne({ email: req.body.email })
    : await UserWithNumber.findOne({ mobileNumber: req.body.mobileNumber });

  if (user) return res.status(400).send("user already exists");

  if (
    !(await UserWithEmail.findOne({ userName: req.body.userName })) &&
    !(await UserWithNumber.findOne({ userName: req.body.userName }))
  ) {
    user = isEmail ? new UserWithEmail(req.body) : new UserWithNumber(req.body);
    user.password = await passHash(user.password);
    await user.save();
  } else return res.status(400).send("User name already exists");

  const token = generateJwtToken(req.body);
  res.status(200).header("x-auth-header", token).send();
});

module.exports = router;
