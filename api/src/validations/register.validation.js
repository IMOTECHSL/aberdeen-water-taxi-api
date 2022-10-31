const { body } = require("express-validator");

module.exports.schema = [
  body("fullname")
    .notEmpty()
    .withMessage("Full Name is required")
    .isLength({ max: 150, min: 3 })
    .withMessage("Full Name must be between 3 -150 Characters long")
    .trim()
    .escape()
    .isString()
    .withMessage("Full Name must be Alphanumeric"),
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ max: 150, min: 3 })
    .withMessage("Username must be between 3-50 Characters long")
    .trim()
    .escape()
    .isAlphanumeric()
    .withMessage("Username must be Alphanumeric"),
  body("email")
    .notEmpty()
    .withMessage("E-mail is required")
    .isEmail({ ignore_max_length: false, require_tld: true })
    .withMessage("E-mail must be a valid email address")
    .trim()
    .escape(),
  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone Number is required")
    .isMobilePhone()
    .withMessage("Phone number must be a valid number")
    .isLength({ min: 9, max: 20 })
    .trim()
    .escape(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 50 })
    .withMessage(
      "Password must contain an uppercase character, lowecase character, a special character and one number"
    )
    .trim(),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm Password is required")
    .custom((value, req) => {
      if (value !== req.req.body.password) {
        return false;
      }
      return true;
    })
    .withMessage("Passwords do not match"),
];
