const Joi = require('joi');

const bodySchema = Joi.alternatives().try(
    Joi.object({
      userName: Joi.string(),
    }),
  );

  module.exports = bodySchema;