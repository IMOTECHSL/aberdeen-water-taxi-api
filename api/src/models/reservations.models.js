const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const Boats = require("./boats.models");

let ReservationSchema = new Schema(
  {
    uuid: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID  is required"],
    },
    passengerName: {
      type: String,
      required: [true, "Passenger Name is required"],
    },
    email: {
      type: String,
      required: [true, "E-mail is required"],
      length: { min: 10, max: 150 },
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required"],
    },
    airline: {
      type: Schema.Types.ObjectId,
      ref: "Airline",
      required: [true, "Airline ID  is required"],
    },
    travelDate: {
      type: String,
      required: [true, "Travel Date is required"],
    },
    travelTime: {
      type: String,
      required: [true, "Travel Time is required"],
    },
    travelType: {
      type: String,
      enum: {
        values: ["INBOUND", "OUTBOUND", "NONE"],
        message: "{VALUE} is not supported",
      },
      required: true,
      default: "OUTBUND",
    },
    numberOfAdults: {
      type: Number,
      required: [true, "Number of Adult(s) is required"],
      min: 1,
      max: 10,
      default: 1,
    },
    numberOfInfants: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    fromLocation: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: [true, "From Location is required"],
    },
    toLocation: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: [
        true,
        "To Location is required, and cannot be same as From Location",
      ],
    },
    boat: {
      type: Schema.Types.ObjectId,
      ref: "Boat",
      required: [true, "Boat ID is required"],
    },

    status: {
      type: String,
      enum: {
        values: ["PENDING", "CONFIRMED", "CANCELLED"],
        message: "{VALUE} is not supported",
      },
      default: "PENDING",
      required: true,
    },
    // qrCode: {
    //   type: String,
    //   required: true,
    // },
    orderId: {
      type: String,
      default: "",
    },
    paymentMethod: {
      type: String,
      enum: {
        values: ["ORANGE MONEY", "CASH"],
        message: "{VALUE} is not supported",
      },
      required: true,
      default: "CASH",
    },
    paymentStatus: {
      type: String,
      enum: {
        values: ["PENDING", "SUCCESS", "FAILED"],
      },
      required: true,
    },
    total: {
      type: Number,
      default: 0.0,
    },
    discountPercentage: {
      type: Number,
      default: 0.0,
    },
    discountTotal: {
      type: Number,
      default: 0.0,
    },
    couponCode: {
      type: String,
      default: "N/A",
    },
    grandTotal: {
      type: Number,
      default: 0.0,
    },
    reservationDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reservation", ReservationSchema);
