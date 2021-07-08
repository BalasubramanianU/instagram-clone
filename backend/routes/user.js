const express = require("express");
const router = express.Router();

const { UserWithEmail, UserWithNumber } = require("../models/user");

const config = require("config");
const jwt = require("jsonwebtoken");

function generateJwtToken(payload) {
  return jwt.sign(payload, config.get("jwtKey"));
}

router.post("/", async (req, res) => {
  let user = req.body.email
    ? new UserWithEmail(req.body)
    : new UserWithNumber(req.body);
  await user.save();
  const token = generateJwtToken(req.body);
  res.status(200).send(token);
});

module.exports = { router, generateJwtToken };
