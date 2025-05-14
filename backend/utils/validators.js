// utils/validators.js
const Joi = require('joi');

exports.registerValidator = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  profilePicture: Joi.string()
});

exports.loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

exports.transactionValidator = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  amount: Joi.number().positive().required(),
  type: Joi.string().valid('income', 'expense').required(),
  category: Joi.string().required(),
  date: Joi.date().required(),
  description: Joi.string().max(200)
});

exports.categoryValidator = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  type: Joi.string().valid('income', 'expense').required()
});