const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  port: process.env.PORT,
  token_secret: process.env.TOKEN_SECRET,
};
