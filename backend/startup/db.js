const mongoose = require("mongoose");

// const config = require("config");
const uri = process.env.MONGODB_URI;

module.exports = function () {
  mongoose
    .connect(
      uri,
      // config.get("db")
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("connected to mongodb");
    });
};
