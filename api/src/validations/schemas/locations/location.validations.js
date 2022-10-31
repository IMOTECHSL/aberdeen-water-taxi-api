// const Joi = require("joi");

// const schema = Joi.object({
//   boatName: Joi.string().max(100).min(5).required(),
//   numberOfPassengers: Joi.number().min(6).max(50).required(),
//   pricePerSeat: Joi.number().required(),
// });

// module.exports = schema;
const { body } = require("express-validator");

const schema = [
  body("name").not().isEmpty().withMessage("Location name is required"),
  body("description").not().isEmpty().withMessage("Description is required"),
  body("image").not().isEmpty().withMessage("Location Image is required"),
];
module.exports = schema;
