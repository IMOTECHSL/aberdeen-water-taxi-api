const { default: mongoose } = require("mongoose");
const userService = require("../services/users.service");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const usersModels = require("../models/users.models");
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json({ status: "success", data: users });
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.getUserByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id === "undefined" || !mongoose.Types.ObjectId.isValid(id)) {
      return res.sendStatus(400);
    }
    const found = await userService.getUserByID(id);
    if (!found) {
      return res.sendStatus(404);
    }
    return res.status(200).json({ status: "success", data: found });
  } catch (err) {
    //todo log error to file
    res.sendStatus(500);
  }
};

exports.createNewUser = async (req, res, next) => {
  const errors = validationResult(req).array();

  if (errors.length) {
    console.log(errors);
    return res.sendStatus(400);
  }

  let { fullname, username, email, phoneNumber, password } = req.body;

  // check if username, email or phone number exist
  const usernameTaken = await userService.getUserByUsername(username);
  const phoneTaken = await userService.getUserByPhone(phoneNumber);
  const emailTaken = await userService.getUserByEmail(email);
  if (usernameTaken) {
    console.log(usernameTaken);
    return res
      .status(400)
      .json({ status: "error", data: "Username Already Exist" });
  }
  if (emailTaken) {
    return res
      .status(400)
      .json({ status: "error", data: "Email Already Exist" });
  }
  if (phoneTaken) {
    return res
      .status(400)
      .json({ status: "error", data: "Phone Number Already Exist" });
  }

  // hash user's password
  const hashSalt = await bcryptjs.genSalt(10);
  let hashedPassword = await bcryptjs.hash(password, hashSalt);

  //generate verification token
  const token = await crypto.randomInt(100000, 999999);
  let user = {
    fullname,
    username,
    email,
    phoneNumber,
    hashedPassword,
    token,
    userType: "admin",
  };
  //todo save to database
  await userService.createUser(user);
  return res.sendStatus(201);
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id === "undefined" || !mongoose.Types.ObjectId.isValid(id)) {
      return res.sendStatus(400);
    }
    const found = await userService.getUserByID(id);
    if (!found) {
      return res.sendStatus(404);
    }
    return res.status(200).json({ status: "success", data: found });
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id === "undefined" || !mongoose.Types.ObjectId.isValid(id)) {
      return res.sendStatus(400);
    }
    const found = await userService.getUserByID(id);
    if (!found) {
      return res.sendStatus(404);
    }
    const done = await userService.deleteUserById(id);
    return res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
};
