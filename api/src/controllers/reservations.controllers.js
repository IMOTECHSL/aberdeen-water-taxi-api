const reservationService = require("../services/reservations.service");
const { v4: uuidv4 } = require("uuid");
const schema = require("../validations/reservation.validations");
const { validationResult } = require("express-validator");
const { generateQR } = require("../utils/qr.utils");
const { unlink } = require("fs");
const path = require("path");
const mongoose = require("mongoose");

exports.getAllReservations = async (req, res, next) => {
  try {
    const reservations = await reservationService.getAllReservations();
    return res.status(200).json({ status: "success", data: reservations });
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.getReservationByID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const found = await reservationService.getReservationByID(id);
    if (!found) {
      return res.sendStatus(404);
    } else {
      return res.status(200).json({ status: "success", data: found });
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.createNewReservation = async (req, res, next) => {
  let errors = validationResult(req).array();

  if (errors.length) {
    errors = errors.map((e) => {
      return {
        msg: e.msg,
        field: e.param,
      };
    });
    return res.status(400).json({ status: "error", data: errors });
  }

  //extract data from request body
  const {
    passengerName,
    email,
    phoneNumber,
    airline,
    travelDate,
    travelTime,
    travelType,
    numberOfAdults,
    numberOfInfants,
    fromLocation,
    toLocation,
    boat,
    paymentMethod,
  } = req.body;

  //TODO generate uuid
  const uid = uuidv4();
  //TODO generate qr code embedded with uuid

  const done = await generateQR(uid, uid);
  if (!done) {
    console.log(done);
    return;
  }

  const codePath = `qrcodes/${uid}.png`;

  //TODO save reservation
  const reservation = {
    uuid: uid,
    passengerName,
    email,
    phoneNumber,
    airline,
    travelDate,
    travelTime,
    travelType,
    numberOfAdults,
    numberOfInfants,
    fromLocation,
    toLocation,
    boat,
    status: "PENDING",
    qrCode: codePath,
    paymentMethod,
    paymentStatus: "PENDING",
  };

  await reservationService.createReservation(reservation);
  return res.sendStatus(200);
  // return;
};

exports.updateReservation = async (req, res, next) => {
  const { id } = req.params;

  if (typeof id === "undefined") {
    return res.sendStatus(400);
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.sendStatus(400);
  }
};
exports.updateReservationStatus = async (req, res, next) => {
  try {
    const { id, status } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.sendStatus(400);
    }

    if (status === "undefined" || id === "undefined") {
      return res.sendStatus(400);
    }

    //check if reservation exist
    const found = await reservationService.getReservationByID(id);
    if (!found) {
      return res.sendStatus(404);
    }

    const done = await reservationService.updateReservationStatus(id, status);
    return res.status(200).json({ status: "success", data: done });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

exports.deleteReservation = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (typeof id === "undefined") {
      return res.sendStatus(400);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.sendStatus(400);
    }
    const found = await reservationService.getReservationByID(id);
    if (!found) {
      return res.sendStatus(404);
    }
    let { qrCode } = found;
    const file = path.join(__dirname, "..", "public", qrCode);
    console.log(file);

    unlink(file, async (err) => {
      if (err) throw err;
      const done = await reservationService.deleteReservationById(id);
      if (done) {
        return res.sendStatus(204);
      }
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
