const Airlines = require("../models/airlines.model");

// 1 --> GET ALL AIRLINES
exports.getAllAirlines = async () => {
  try {
    return await Airlines.find();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// 2 --> GET AIRLINE BY ID
exports.getAirlineByID = async (airlineId) => {
  try {
    const found = await Airlines.findOne({ _id: airlineId }).exec();
    if (found) {
      return found;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

// 3 --> CREATE NEW AIRLINE
exports.createNewAirline = async (airline) => {
  try {
    return await Airlines.create(airline);
  } catch (err) {
    throw err;
  }
};

// 4 --> UPDATE AIRLINE BY ID
exports.updateAirlineById = async (airlineId, airline) => {
  try {
    return await Airlines.findOneAndUpdate(airlineId, airline).exec();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// 5 --> DELETE AIRLINE BY ID
exports.deleteAirlineById = async (airlineId) => {
  try {
    return await Airlines.findByIdAndDelete(airlineId);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
