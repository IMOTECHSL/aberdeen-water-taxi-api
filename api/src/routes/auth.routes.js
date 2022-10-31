const router = require("express").Router();
// const { schema } = require("../validations/login.validation");
const { schema } = require("../validations/register.validation");
const {
  registerUser,
  LoginHandler,
  verifyUser,
  recoverUserPassword,
} = require("../controllers/auth.controller");

router.post("/login", LoginHandler);
router.post("/signup", schema, registerUser);
router.post("/verify?:token", verifyUser);
router.post("/lost-password", recoverUserPassword);
module.exports = router;
