const express = require("express");
const authMiddleware = require("../middlewares/auth_middleware");
const adminMiddleware = require("../middlewares/admin_middleware");
const router = express.Router();

router.get("/welcome", authMiddleware, adminMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Admin Route",
  });
});

module.exports = router;
