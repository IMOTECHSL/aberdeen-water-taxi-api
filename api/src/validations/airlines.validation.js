const { body } = require("express-validator");

module.exports.schema = [
  body("airlineName")
    .not()
    .isEmpty()
    .withMessage("Airline Name is required")
    .trim()
    ,
  body("airlineNumber")
    .not()
    .isEmpty()
    .withMessage("Airline Number is required")
    .trim()
    ,
];
