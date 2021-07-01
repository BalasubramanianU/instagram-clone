const express = require("express");
const app = express();
const { port, token_secret } = require("./config");
const jwt = require("jsonwebtoken");

function generateJwtToken(payload) {
  return jwt.sign(payload, token_secret);
}

app.use(express.json());

app.post("", (req, res, next) => {
  const token = generateJwtToken(req.body);
  res.status(200).send(token);
});

var server = app.listen(port);

module.exports = {server,generateJwtToken};