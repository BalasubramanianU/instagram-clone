const express = require("express");
const app = express();

const { port } = require("./config");
require("./startup/routes")(app);
require("./startup/db")();

var server = app.listen(port);

module.exports = { server };
