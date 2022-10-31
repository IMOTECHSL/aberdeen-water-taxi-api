const router = require("express").Router();
const schema = require("../validations/schemas/locations/location.validations");
const { body } = require("express-validator");

const {
  getAllLocations,
  getLocationByID,
  createNewLocation,
  updateLocation,
  deleteLocation,
} = require("../controllers/locations.controllers");

router.get("/", getAllLocations);
router.get("/:id", getLocationByID);
router.post(
  "/",
  [
    body("name").not().isEmpty().withMessage("Location name is required"),
    body("description").not().isEmpty().withMessage("Description is required"),
    body("image").not().isEmpty().withMessage("Location Image is required"),
  ],
  createNewLocation
);
router.put("/:id", updateLocation);
router.delete("/:id", deleteLocation);
module.exports = router;
