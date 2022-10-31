const reservationService = require("../services/reservations.service");
const { v4: uuidv4 } = require("uuid");
const schema = require("../validations/reservation.validations");
const { validationResult } = require("express-validator");
const { generateQR, getFullUrl } = require("../utils/qr.utils");
const { unlink } = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { reservationCompleteEmail } = require("../utils/mailer.utils");
const Reserservation = require("../models/reservations.models");

exports.getAllReservations = async (req, res, next) => {
  try {
    let reservations = [];
    console.log(typeof reservations);
    const { id, admin } = req.user;
    if (admin) {
      //get all reservation
      reservations = await reservationService.getAllReservations();
    } else {
      //get users reservation
      reservations = await reservationService.getReservationByUser(id);
    }

    return res.status(200).json({ status: "success", data: reservations });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.getReservationByID = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.sendStatus(400);
    }
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

exports.getPaymentURL = async (req, res, next) => {
  if (!req.body) {
    return res.sendStatus(400);
  }
  const { amount } = req.body;
  try {
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.sendStatus(400);
    }
    const orderId = `AWT-${uuidv4()}`;
    const paymentUrl = await reservationService.getPaymentUrl({
      orderId,
      amount: req.body.amount,
    });

    return res
      .status(200)
      .send({ status: "success", data: { orderId, paymentUrl } });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

exports.createNewReservation = async (req, res, next) => {
  try {
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
      total,
      couponCode,
      discountPercentage,
      discountTotal,
      grandTotal,
    } = req.body;

    // generate uuid
    const uid = uuidv4();

    // // generate qr code embedded with uuid
    const done = await generateQR(uid, uid);
    if (!done) {
      return res.sendStatus(500);
    }

    const codePath = `images/qr/${uid}.jpg`;
    const codeUrl = `${req.protocol}://${req.get("host")}/${codePath}`;
 
    //TODO save reservation
    const reservation = new Reserservation({
      uuid: uid,
      user: req.user.id,
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
      qrCode: codeUrl,
      orderId: req.body.orderId ? req.body.orderId : "",
      paymentMethod,
      paymentStatus: "PENDING",
      total,
      couponCode,
      discountPercentage,
      discountTotal,
      grandTotal,
    });

    const response = await reservationService.createReservation(reservation);
    // send email when reservation is complete
    //await reservationCompleteEmail(response);

    return res.status(200).json({
      status: "success",
      data: {
        qrCode: codeUrl,
      },
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
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

    unlink(file, async (err) => {
      if (err) throw err;
      const done = await reservationService.deleteReservationById(id);
      if (done) {
        return res.sendStatus(204);
      }
    });
  } catch (err) {
    return res.sendStatus(500);
  }
};
