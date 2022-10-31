const Users = require("../models/users.models");

// 1 --> GET ALL Users
exports.getAllUsers = async () => {
  try {
    return await Users.find();
  } catch (err) {
    throw err;
  }
};

// 2 --> GET User BY ID
exports.getUserByID = async (userId) => {
  try {
    const found = await Users.findOne({ _id: userId }).exec();
    if (found) {
      return found;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

// 3 --> CREATE NEW User
exports.createUser = async (newUser) => {
  try {
    return await Users.create(newUser);
  } catch (err) {
    throw err;
  }
};

// 4 --> UPDATE User BY ID
exports.updateUserById = async (userId, updatedUser) => {
  try {
    return await Users.findByIdAndUpdate(userId, updatedUser).exec();
  } catch (err) {
    throw err;
  }
};

// 5 --> DELETE User BY ID
exports.deleteUserById = async (userId) => {
  try {
    return await Users.findByIdAndDelete(userId);
  } catch (err) {
    throw err;
  }
};
