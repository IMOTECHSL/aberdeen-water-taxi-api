const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AirlineSchema = new Schema(
  {
    airlineName: {
      type: String,
      required: true,
    },
    airlineNumber: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

AirlineSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(error);
  } else {
    next(error);
  }
});

module.exports = mongoose.model("Airline", AirlineSchema);
