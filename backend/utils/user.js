const bcrypt = require("bcrypt");
const config = require("config");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

function generateJwtToken(payload) {
  return jwt.sign(payload, config.get("jwtKey"));
}

function validateLoginWithEmail(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
}

function validateLoginWithNumber(user) {
  const schema = Joi.object({
    mobileNumber: Joi.string()
      .min(4)
      .max(15)
      .pattern(/^[0-9]+$/, "numbers")
      .required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
}

function validateLoginWithName(user) {
  const schema = Joi.object({
    userName: Joi.string().min(1).max(255).required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
}

function validateSignUpWithEmail(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    fullName: Joi.string().min(1).max(255).required(),
    userName: Joi.string().min(1).max(255).required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
}

function validateSignUpWithNumber(user) {
  const schema = Joi.object({
    mobileNumber: Joi.string()
      .min(4)
      .max(15)
      .pattern(/^[0-9]+$/, "numbers")
      .required(),
    fullName: Joi.string().min(1).max(255).required(),
    userName: Joi.string().min(1).max(255).required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
}

async function passHash(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

module.exports = {
  generateJwtToken,
  passHash,
  validateLoginWithEmail,
  validateLoginWithNumber,
  validateLoginWithName,
  validateSignUpWithEmail,
  validateSignUpWithNumber,
};
