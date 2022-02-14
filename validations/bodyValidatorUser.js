const Joi = require('joi');

const bodySchema = Joi.object({
    firstName:Joi.string().required(),
    lastName:Joi.string().min(3).max(30).required(),
    userName:Joi.string().min(3).max(30).required(),
    password:Joi.string().required(),
    email:Joi.string().required(),
    address:Joi.string().required(),
    phone:Joi.number().required(),
  });

  module.exports = bodySchema;