const router = require("express").Router();
const {
  getAllBoats,
  getBoatByID,
  createNewBoat,
  updateBoatByID,
  deleteBoatByID,
} = require("../controllers/boats.controllers");

router.get("/", getAllBoats);
router.get("/:id", getBoatByID);
router.post("/", createNewBoat);
router.put("/:id", updateBoatByID);
router.delete("/:id", deleteBoatByID);
module.exports = router;
