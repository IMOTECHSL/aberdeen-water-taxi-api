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
    discountTotal: {
      type: Number,
      default: 0.0,
    },
    grandTotal: {
      type: Number,
      default: 0.0,
    },
    couponCode: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ReservationDetail", ReservationDetailsSchema);
