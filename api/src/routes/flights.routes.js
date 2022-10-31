const router = require("express").Router();
const {
  getAllFlights,
  getFlightByID,
  createNewFlight,
  updateFlightByID,
  deleteFlightByID,
} = require("../controllers/flights.controller");

router.get("/", getAllFlights);
router.get("/:id", getFlightByID);
router.post("/", createNewFlight);
router.put("/:id", updateFlightByID);
router.delete("/:id", deleteFlightByID);
module.exports = router;
