const Joi = require("joi");

const schema = Joi.object({
  flightName: Joi.string().max(100).min(5).required(),
  flightNumber: Joi.string().min(6).max(10).required(),
});

module.exports = schema;
