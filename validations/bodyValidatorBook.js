const Joi = require('joi');

const bodySchema = Joi.object({
    title:Joi.string().required(),
    author:Joi.string().min(3).max(30).required(),
    genre:Joi.string().required(),
    read:Joi.boolean().required()
});

module.exports = bodySchema;