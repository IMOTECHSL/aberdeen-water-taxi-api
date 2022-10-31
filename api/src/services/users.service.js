const Users = require("../models/users.models");

exports.getAllUsers = async () => {
  try {
    return await Users.find();
  } catch (err) {
    throw err;
  }
};

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
exports.getUserByEmail = async (email) => {
  try {
    const found = await Users.findOne({ email: email }).exec();
    if (found) {
      return found;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

exports.getUserByPhone = async (phone) => {
  try {
    const found = await Users.findOne({ phoneNumber: phone }).exec();
    if (found) {
      return found;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};
exports.verifyAccount = async (_id) => {
  try {
    const found = await Users.findByIdAndUpdate(
      _id,
      {
        token: null,
        verifiedAt: Date.now(),
      },
      { new: true }
    ).exec();
    if (found) {
      return found;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

exports.getUserByToken = async (token) => {
  try {
    const found = await Users.findOne({ token: token }).exec();
    if (found) {
      return found;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

exports.getUserByUsername = async (username) => {
  try {
    const found = await Users.findOne({ username: username }).exec();
    if (found) {
      return found;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

exports.createUser = async (newUser) => {
  const {
    fullname,
    username,
    email,
    phoneNumber,
    hashedPassword,
    token,
    userType,
  } = newUser;
  try {
    const user = new Users({
      fullname,
      username,
      email,
      phoneNumber,
      password: hashedPassword,
      token,
      userType: userType,
    });
    return await Users.create(user);
  } catch (err) {
    throw err;
  }
};

exports.updateUserById = async (id, user) => {
  try {
    return await Users.findByIdAndUpdate(id, user).exec();
  } catch (err) {
    throw err;
  }
};

exports.deleteUserById = async (id) => {
  try {
    return await Users.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
};
