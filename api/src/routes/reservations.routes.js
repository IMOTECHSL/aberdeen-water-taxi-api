const router = require("express").Router();
const { schema } = require("../validations/reservation.validations");
const { fileUpload } = require("../utils/upload.utils");
const { param } = require("express-validator");
const {
  getAllReservations,
  getReservationByID,
  createNewReservation,
  updateReservation,
  updateReservationStatus,
  deleteReservation,
} = require("../controllers/reservations.controllers");

router.get("/", getAllReservations);
router.get("/:id", getReservationByID);
router.post("/", schema, createNewReservation);
router.put("/:id", schema, updateReservation);
router.patch(
  "/:id/:status",

  updateReservationStatus
);
router.delete("/:id", deleteReservation);
module.exports = router;
