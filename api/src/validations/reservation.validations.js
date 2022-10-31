const { body } = require("express-validator");
const moment = require("moment");
module.exports.schema = [
  body("passengerName")
    .notEmpty()
    .withMessage("Passenger Name is required")
    .isLength({ max: 150, min: 3 })
    .withMessage("Passenger Name must be between 3 -150 Characters long")
    .trim()
    .escape()
    .isString()
    .withMessage("Passenger Name must be Alphanumeric")
    .toUpperCase(),
  body("email")
    .notEmpty()
    .withMessage("E-mail is required")
    .isEmail({ ignore_max_length: false, require_tld: true })
    .withMessage("E-mail must be a valid email address")
    .trim()
    .escape()
    .toUpperCase(),
  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone Number is required")
    .isMobilePhone()
    .withMessage("Phone number must be a valid number")
    .isLength({ min: 9, max: 15 })
    .trim()
    .escape()
    .toUpperCase(),
  body("airline")
    .notEmpty()
    .withMessage("Airline is required")
    .isMongoId()
    .withMessage("Airline is invalid")
    .trim(),
  body("travelDate")
    .notEmpty()
    .withMessage("Travel Date is required")
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("Travel Date must be a valid date")
    .custom((input) => {
      const today = moment().format("YYYY-MM-DD");

      if (moment(input).isBefore(today)) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("Date must not be an old date  "),
  body("travelTime").notEmpty().withMessage("Travel Time is required").trim(),
  body("travelType")
    .notEmpty()
    .withMessage("Travel type is required")
    .default("INBOUND")
    .custom((input) => {
      if (input === "INBOUND" || input === "OUTBOUND") {
        return true;
      } else {
        return false;
      }
    })
    .withMessage("Invalid Travel Type")
    .trim()

    .toUpperCase(),

  body("numberOfAdults")
    .notEmpty()
    .withMessage("Number of Adult(s) is required")
    .isNumeric({ no_symbols: true })
    .withMessage("Must be a valid number")
    .isLength({ min: 1, max: 10 })
    .withMessage("Number of Adult(s) must be between 1 - 10")
    .default(1),
  body("numberOfInfants")
    .isNumeric({ no_symbols: true })
    .withMessage("Must be a valid number")
    .isLength({ min: 0, max: 10 })
    .withMessage("Number of Infant(s) must be between 0 - 10")
    .default(0),
  body("fromLocation")
    .notEmpty()
    .withMessage("From Location is required")
    .isMongoId()
    .withMessage("From Location must be a valid ID")
    .trim(),
  body("toLocation")
    .notEmpty()
    .withMessage("To Location is required")
    .isMongoId()
    .withMessage("To Location must be a valid ID")
    .custom((input, req) => {
      if (input === req.req.body.fromLocation) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("From and To Location cannot be the same ")
    .trim(),
  body("boat")
    .notEmpty()
    .withMessage("Boat is required")
    .isMongoId()
    .withMessage("Boat is invalid")
    .trim(),
  body("paymentMethod")
    .notEmpty()
    .withMessage("Payment Method is required")
    .custom((input) => {
      if (input === "ORANGE MONEY" || input === "PAYPAL" || "CASH") {
        return true;
      } else {
        return false;
      }
    })
    .trim()
    .default("CASH")
    .toUpperCase(),
];
