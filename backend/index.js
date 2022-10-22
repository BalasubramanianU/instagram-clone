const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.static(path.join(__dirname, "frontend", "build")));

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();

const config = require("config");

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

const port = process.env.PORT || config.get("port");
var server = app.listen(port, () => {
  console.log(`listening on port:${port}`);
});

module.exports = server;
