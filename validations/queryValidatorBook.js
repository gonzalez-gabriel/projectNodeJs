const Joi = require('joi');

const bodySchema = Joi.alternatives().try(
    Joi.object({
      title: Joi.string().required(),
    }),
    Joi.object({
      author: Joi.string().required(),
    })
  );

  module.exports = bodySchema;