const router = require("express").Router();
const {schema} = require("../validations/register.validation")
const {
  getAllUsers,
  getUserByID,
  createNewUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controllers");

router.get("/", getAllUsers);
router.get("/:id", getUserByID);
router.post("/", schema, createNewUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
module.exports = router;
