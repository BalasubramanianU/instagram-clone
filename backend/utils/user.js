const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

function generateJwtToken(payload) {
  return jwt.sign(payload, config.get("jwtKey"));
}

async function passHash(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

module.exports = { generateJwtToken, passHash };
