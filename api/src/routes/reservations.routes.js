const router = require("express").Router();
const { schema } = require("../validations/reservation.validations");
const { requireAuth } = require("../middleware/auth.middleware");
const { body } = require("express-validator");
const {
  getAllReservations,
  getReservationByID,
  createNewReservation,
  updateReservation,
  updateReservationStatus,
  deleteReservation,
  getPaymentURL,
} = require("../controllers/reservations.controllers");

//todo --> add protection to route
router.post("/payment", getPaymentURL);

//todo --> add protection to route
router.get("/", requireAuth, getAllReservations);

//Get reservation by ID
//todo --> add protection to route
router.get("/:id", getReservationByID);

//TODO -> Get reservations by User ID
//router.get("/:userId",requireAuth, getReservationByID);

//TODO -> Add Protection to route
router.post("/", requireAuth, schema, createNewReservation);

//TODO -> Add Protection to route
router.put("/:id", schema, updateReservation);
router.patch(
  "/:id/:status",

  updateReservationStatus
);

//TODO -> Add Protection to route
router.delete("/:id", deleteReservation);

module.exports = router;
