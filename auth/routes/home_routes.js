const express = require("express");
const authMiddleware = require("../middlewares/auth_middleware");
const router = express.Router();

router.get("/welcome", authMiddleware, (req, res) => {
  const { username, userId, role } = req.userInfo;
  res.json({
    message: "Welcome to Home Route",
    user: {
      _id: userId,
      username: username,
      role: role,
    },
  });
});

module.exports = router;
