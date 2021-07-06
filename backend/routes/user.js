const express = require("express");
const router = express.Router();

const { token_secret } = require("../config");
const User = require("../models/user");

const jwt = require("jsonwebtoken");

function generateJwtToken(payload) {
  return jwt.sign(payload, token_secret);
}

router.post("/", async (req, res) => {
  let user = new User(req.body);
  await user.save();
  const token = generateJwtToken(req.body);
  res.status(200).send(token);
});

module.exports = { router, generateJwtToken };
