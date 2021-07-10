const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-header");

  const decoded = jwt.verify(token, config.get("jwtKey"));
  req.user = decoded;
  next();
};
