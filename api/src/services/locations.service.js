const Locations = require("../models/locations.model");



// 1 --> GET ALL Locations
exports.getAllLocations = async () => {
  try {
    return await Locations.find();
  } catch (err) {
    throw err;
  }
};

// 2 --> GET Location BY ID
exports.getLocationByID = async (locationId) => {
  try {
    const found = await Locations.findOne({ _id: locationId }).exec();
    if (found) {
      return found;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

// 3 --> CREATE NEW Location
exports.createLocation = async (newLocation) => {
  try {
    return await Locations.create(newLocation);
  } catch (err) {
    return err;
  }
};

// 4 --> UPDATE Location BY ID
exports.updateLocationById = async (locationId, updatedLocation) => {
  try {
    return await Locations.findByIdAndUpdate(
      locationId,
      updatedLocation
    ).exec();
  } catch (err) {
    throw err;
  }
};

// 5 --> DELETE Location BY ID
exports.deleteLocationById = async (locationId) => {
  try {
    return await Locations.findByIdAndDelete(locationId);
  } catch (err) {
    throw err;
  }
};
