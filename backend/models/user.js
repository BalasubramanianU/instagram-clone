const mongoose = require("mongoose");

const userSchemaWithEmail = new mongoose.Schema({
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  userName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

const userSchemaWithNumber = new mongoose.Schema({
  mobileNumber: {
    type: String,
    minLength: 4,
    maxLength: 15,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  userName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

const UserWithEmail = mongoose.model("userWithEmail", userSchemaWithEmail);

const UserWithNumber = mongoose.model("userWithNumber", userSchemaWithNumber);

module.exports = { UserWithEmail, UserWithNumber };
