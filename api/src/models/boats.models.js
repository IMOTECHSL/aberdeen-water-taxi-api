const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoatSchema = new Schema({
  boatName: {
    type: String,
    required: true,
    unique:true
  },
  numberOfPassengers: {
    type: Number,
    required: true,
  },
  pricePerAdult: {
    type: Number,
    required: true,
  },
  pricePerInfant: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Boat", BoatSchema);
