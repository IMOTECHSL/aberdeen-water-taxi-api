const Joi = require("joi");

const schema = Joi.object({
  boatName: Joi.string().max(100).min(5).required(),
  numberOfPassengers: Joi.number().min(6).max(50).required(),
  pricePerAdult: Joi.number().required().min(20).max(50),
  pricePerInfant: Joi.number().required().min(20).max(50),
}).options({ abortEarly: false });

module.exports = schema;
