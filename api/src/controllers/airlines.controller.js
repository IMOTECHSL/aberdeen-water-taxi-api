const airlineService = require("../services/airlines.service");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

//1 -> Get All Airlines
exports.getAllAirlines = async (req, res, next) => {
  try {
    const airlines = await airlineService.getAllAirlines();
    return res.status(200).json({ status: "success", data: airlines });
  } catch (error) {
    return res.sendStatus(500);
  }
};

//2 -> Get Airline By ID
exports.getAirlineByID = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (typeof id === "undefined") {
      return res.sendStatus(400);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.sendStatus(400);
    }
    const found = await airlineService.getAirlineByID(id);
    if (!found) {
      return res.sendStatus(404);
    }

    return res.status(200).json({ status: "success", data: found });
  } catch (error) {
    return res.sendStatus(500);
  }
};

//3 -> Create New Airline
exports.createNewAirline = async (req, res, next) => {
  try {
    let errors = validationResult(req).array();
    if (errors.length) {
      errors = errors.map((error) => {
        return {
          msg: error.msg,
          field: error.param,
        };
      });

      return res.status(400).json({ status: "error", data: errors });
    }

    const airline = {
      airlineName: req.body.airlineName.toString(),
      airlineNumber: req.body.airlineNumber.toString(),
    };
    const done = await airlineService.createNewAirline(airline);

    return res.status(200).json({ status: "success", data: done });
  } catch (error) {
    if (error && error.code === 11000) {
      return res
        .status(400)
        .json({ status: "error", data: "Airline Number must be unique" });
    }
    return res.sendStatus(500);
  }
};

//4 -> Update Airline By ID
exports.updateAirlineByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (typeof id === "undefined") {
      return res.sendStatus(400);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.sendStatus(400);
    }
    const found = await airlineService.getAirlineByID(id);
    if (!found) {
      return res.sendStatus(404);
    }

    //check for errors
    let errors = validationResult(req).array();
    if (errors.length) {
      errors = errors.map((error) => {
        return {
          msg: error.msg,
          field: error.param,
        };
      });

      return res.status(400).json({ status: "error", data: errors });
    }
    const airline = {
      airlineName: req.body.airlineName.toString(),
      airlineNumber: req.body.airlineNumber.toString(),
    };
    const done = await airlineService.updateAirlineById(id, airline);
    return res.status(200).json({ status: "success", data: done });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

//5 -> Delete Airline By ID
exports.deleteAirlineByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (typeof id === "undefined") {
      return res.sendStatus(400);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.sendStatus(400);
    }
    const found = await airlineService.getAirlineByID(id);
    if (!found) {
      return res.sendStatus(404);
    }
    const deleted = await airlineService.deleteAirlineById(id);
    return res.status(200).json({ status: "success", data: deleted });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
