const router = require("express").Router();
const { schema: loginSchema } = require("../validations/login.validation");
const { schema } = require("../validations/register.validation");
const { requireAuth } = require("../middleware/auth.middleware");
const {
  registerUser,
  LoginHandler,
  verifyUser,
  recoverUserPassword,
  authenticate,
} = require("../controllers/auth.controller");

router.post("/login", loginSchema, LoginHandler);
router.post("/signup", schema, registerUser);
router.post("/authenticate", registerUser);
router.post("/verify?:token", verifyUser);
router.post("/lost-password", recoverUserPassword);
router.get("/authenticate", requireAuth, authenticate);
module.exports = router;
