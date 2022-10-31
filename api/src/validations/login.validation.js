const { body } = require("express-validator");

module.exports.schema = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ max: 150, min: 3 })
    .withMessage("Username must be between 3-50 Characters long")
    .trim()
    .escape()
    .isAlphanumeric()
    .withMessage("Username must be Alphanumeric"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 50 })
    .withMessage(
      "Password must contain an uppercase character, lowecase character, a special character and one number"
    )
    .escape()
    .trim(),
];
