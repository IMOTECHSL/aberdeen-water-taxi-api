const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

let ReservationDetailsSchema = new Schema(
  {
    reservationId: {
      type: Schema.Types.ObjectId,
      ref: "Reservations",
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    discountTotal: {},
    grandTotal: {
      type: Double,
    },
    couponCode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reservation", ReservationSchema);
