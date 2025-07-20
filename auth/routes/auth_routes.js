const express = require("express");
const {
  registerUser,
  loginUser,
  changePassword,
} = require("../controllers/auth_controllers");
const router = express.Router();

//adding middleware to protect changing password from non-auth user
const authMiddleware = require("../middlewares/auth_middleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/change", authMiddleware, changePassword);

module.exports = router;
