const express = require("express");

const { router } = require("../routes/user");

module.exports = function (app) {
  app.use(express.json());
  app.use("/user", router);
};
