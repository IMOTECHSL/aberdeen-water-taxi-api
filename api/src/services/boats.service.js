const Boats = require("../models/boats.models");

// 1 --> GET ALL BOATS
exports.getAllBoats = async () => {
  try {
    return await Boats.find();
  } catch (err) {
    console.log(err);
  }
};

// 2 --> GET BOAT BY ID
exports.getBoatByID = async (boatId) => {
  try {
    const found = await Boats.findOne({ _id: boatId }).exec();
    if (found) {
      return found;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

// 3 --> CREATE NEW BOAT
exports.createBoat = async (newBoat) => {
  try {
    return await Boats.create(newBoat);
  } catch (err) {
    console.log(err);
  }
};

// 4 --> UPDATE BOAT BY ID
exports.updateBoatById = async (boatId, updatedBoat) => {
  try {
    return await Boats.findOneAndUpdate(boatId, updatedBoat).exec();
  } catch (err) {
    console.log(err);
  }
};

// 5 --> DELETE BOAT BY ID
exports.deleteBoatById = async (boatId) => {
  try {
    return await Boats.findByIdAndDelete(boatId);
  } catch (err) {
    console.log(err);
  }
};
