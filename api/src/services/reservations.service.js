const Reservations = require("../models/reservations.models");

// 1 --> GET ALL Reservations
exports.getAllReservations = async () => {
  try {
    const reservations = await Reservations.find()
      .populate({ path: "airline", select: "airlineName -_id" })
      .populate({ path: "boat", select: "boatName -_id" })
      .populate({ path: "fromLocation", select: "name -_id" })
      .populate({ path: "toLocation", select: "name -_id" })
      .exec();
    return reservations;
  } catch (err) {
    console.log(err);
  }
};

// 2 --> GET Reservation BY ID
exports.getReservationByID = async (reservationId) => {
  try {
    const found = await Reservations.findOne({ _id: reservationId })
      .populate({ path: "airline", select: "airlineName -_id" })
      .populate({ path: "boat", select: "boatName -_id" })
      .populate({ path: "fromLocation", select: "name -_id" })
      .populate({ path: "toLocation", select: "name -_id" })
      .exec();
    if (!found) {
      return null;
    } else {
      return found;
    }
  } catch (err) {
    throw err;
  }
};
exports.getReservationByUser = async (reservationId) => {
  try {
    const found = await Reservations.findOne({ _id: reservationId })
      .populate({ path: "airline", select: "airlineName -_id" })
      .populate({ path: "boat", select: "boatName -_id" })
      .populate({ path: "fromLocation", select: "name -_id" })
      .populate({ path: "toLocation", select: "name -_id" })
      .exec();
    if (!found) {
      return null;
    } else {
      return found;
    }
  } catch (err) {
    throw err;
  }
};

// 3 --> CREATE NEW Reservation
exports.createReservation = async (newReservation) => {
  try {
    return await Reservations.create(newReservation);
  } catch (err) {
    throw err;
  }
};

// 4 --> UPDATE Reservation BY ID
exports.updateReservationById = async (reservationId, updatedReservation) => {
  try {
    return await Reservations.findByIdAndUpdate(
      reservationId,
      updatedReservation,
      { new: true }
    ).exec();
  } catch (err) {
    throw err;
  }
};

exports.updateReservationStatus = async (reservationId, status) => {
  try {
    return await Reservations.findByIdAndUpdate(
      reservationId,
      {
        $set: { status: status },
      },
      { new: true }
    ).exec();
  } catch (err) {
    throw err;
  }
};

// 5 --> DELETE Reservation BY ID
exports.deleteReservationById = async (reservationId) => {
  try {
    return await Reservations.findByIdAndDelete(reservationId);
  } catch (err) {
    throw err;
  }
};
