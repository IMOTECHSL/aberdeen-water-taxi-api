const Joi = require("joi");

const schema = Joi.object({
  boatName: Joi.string().max(100).min(5).required(),
  numberOfPassengers: Joi.number().min(6).max(50).required(),
  pricePerSeat: Joi.number().required(),
});

module.exports = schema;
