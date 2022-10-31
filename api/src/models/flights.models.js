const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FightSchema = new Schema(
  {
    flightName: {
      type: String,
      required: true,
    },
    flightNumber: {
      type: String,
      required: true,
      min: 4,
      max: 10,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Flight", FightSchema);
