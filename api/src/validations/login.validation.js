const { body } = require("express-validator");

module.exports.schema = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .trim()
    .escape(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .escape()
    .trim(),
];
