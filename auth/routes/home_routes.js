const express = require("express");
const router = express.Router();

router.get("/welcome", (req, res) => {
  res.json({
    message: "Welcome to Home Route",
  });
});

module.exports = router;
