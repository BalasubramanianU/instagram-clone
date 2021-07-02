const express = require("express");
const app = express();
const main = require("./mongodb");
const { port, token_secret } = require("./config");
const jwt = require("jsonwebtoken");

function generateJwtToken(payload) {
  return jwt.sign(payload, token_secret);
}

app.use(express.json());

app.post("", (req, res, next) => {
  main(req.body).catch(console.error);
  const token = generateJwtToken(req.body);
  res.status(200).send(token);
});

var server = app.listen(port);

module.exports = { server, generateJwtToken };
