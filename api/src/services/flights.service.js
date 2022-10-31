const Flights = require("../models/flights.models");

// 1 --> GET ALL Flights
exports.getAllFlights = async () => {
  try {
    return await Flights.find();
  } catch (err) {
    throw err;
  }
};

// 2 --> GET Flight BY ID
exports.getFlightByID = async (flightId) => {
  try {
    const found = await Flights.findOne({ _id: flightId }).exec();
    if (found) {
      return found;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

// 3 --> CREATE NEW Flight
exports.createFlight = async (newFlight) => {
  try {
    return await Flights.create(newFlight);
  } catch (err) {
    throw err;
  }
};

// 4 --> UPDATE Flight BY ID
exports.updateFlightById = async (flightId, updatedFlight) => {
  try {
    return await Flights.findByIdAndUpdate(flightId, updatedFlight).exec();
  } catch (err) {
    throw err;
  }
};

// 5 --> DELETE Flight BY ID
exports.deleteFlightById = async (flightId) => {
  try {
    return await Flights.findByIdAndDelete(flightId);
  } catch (err) {
    throw err;
  }
};
