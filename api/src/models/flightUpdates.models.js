const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FightUpdateSchema = new Schema({
  day: {
    type: String,
    required: true,
  },
  flight: {
    type: ObjectId,
    refs: "Flight",
    required: true,
  },
});

module.exports = mongoose.model("FlightUpdate", FightUpdateSchema);
