import Joi from "joi";

function validateEmail(userId) {
  const schema = Joi.string()
    .min(5)
    .max(255)
    .required()
    .email({ tlds: { allow: false } });
  return schema.validate(userId);
}

function validateNumber(userId) {
  const schema = Joi.string()
    .min(4)
    .max(15)
    .pattern(/^[0-9]+$/, "numbers")
    .required();
  return schema.validate(userId);
}

function validateName(userId) {
  const schema = Joi.string().min(1).max(255).required();
  return schema.validate(userId);
}

function validatePassword(password) {
  const schema = Joi.string().min(5).max(1024).required();
  return schema.validate(password);
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

export {
  validateEmail,
  validateNumber,
  validateName,
  validatePassword,
  validateSignUpWithEmail,
  validateSignUpWithNumber,
};
