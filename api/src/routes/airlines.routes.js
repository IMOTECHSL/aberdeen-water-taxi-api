const router = require("express").Router();
const { schema } = require("../validations/airlines.validation");
const {
  getAllAirlines,
  getAirlineByID,
  createNewAirline,
  updateAirlineByID,
  deleteAirlineByID,
} = require("../controllers/airlines.controller");

router.get("/", getAllAirlines);
router.get("/:id", getAirlineByID);
router.post("/", schema, createNewAirline);
router.put("/:id", schema, updateAirlineByID);
router.delete("/:id", deleteAirlineByID);
module.exports = router;
