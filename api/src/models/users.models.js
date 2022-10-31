const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      max: 150,
      min: 3,
    },
    username: {
      type: String,
      required: true,
      max: 20,
      min: 5,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: {
        values: ["admin", "customer"],
        message: "{VALUE} is invalid",
      },
      default: "customer",
    },
    token: {
      type: String,
      default: null,
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
