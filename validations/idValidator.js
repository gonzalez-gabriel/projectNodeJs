const Joi = require('joi');

const bodySchema = Joi.alternatives().try(
    Joi.object({
        userId: Joi.string().alphanum().min(24).max(24).required(),
    }),
    Joi.object({
        bookId: Joi.string().alphanum().min(24).max(24).required(),
    })
    );
   
module.exports = bodySchema;