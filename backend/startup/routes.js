const express = require("express");

const home = require("../routes/home");
const user = require("../routes/user");

module.exports = function (app) {
  app.use(express.json());
  app.use("/home", home);
  app.use("/user", user);
};
