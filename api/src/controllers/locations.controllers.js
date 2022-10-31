const locationService = require("../services/locations.service");
const { validationResult } = require("express-validator");
const { locations } = require("../data/data");
const mongoose = require("mongoose");

exports.getAllLocations = async (req, res, next) => {
  try {
    const locations = await locationService.getAllLocations();

    return res.status(200).json({ status: "success", data: locations });
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.getLocationByID = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (typeof id === "undefined") {
      return res.sendStatus(400);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.sendStatus(400);
    }
    const found = await locationService.getLocationByID(id);
    if (!found) {
      return res.sendStatus(404);
    }
    return res.status(200).json({ status: "success", data: found });
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.createNewLocation = async (req, res, next) => {
  try {
    let { errors } = await validationResult(req);
    if (errors.length) {
      errors = errors.map((error) => {
        return {
          field: error.param,
          msg: error.msg,
        };
      });
      return res.status(401).json({ status: "error", data: errors });
    }

    const done = await locationService.createLocation(req.body);
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStauts(500);
  }
};

exports.updateLocation = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (typeof id === "undefined") {
      return res.sendStatus(400);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.sendStatus(400);
    }
    const { errors } = validationResult(req).array();
    if (errors) {
      return res.status(401).json({ status: "error", data: errors });
    }
    const found = await locationService.getLocationByID(id);
    if (!found) {
      return res.sendStatus(404);
    }
    await locationService.updateLocationById(id, req.body);
    return res.status(200).json({ status: "success", data: req.body });
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.deleteLocation = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (typeof id === "undefined") {
      return res.sendStatus(400);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.sendStatus(400);
    }
    const found = await locationService.getLocationByID(id);
    if (!found) {
      return res.sendStatus(404);
    }
    await locationService.deleteLocationById(id);
    return res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
};
