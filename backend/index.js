const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/db")();

const config = require("config");

const port = process.env.PORT || config.get("port");
var server = app.listen(port, () => {
  console.log(`listening on port:${port}`);
});

module.exports = server;
