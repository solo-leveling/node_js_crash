const express = require("express");
const {
  insertData,
  getProductStats,
  getProductAnalysis,
} = require("../controllers/product_controller");

const router = express.Router();

router.post("/add", insertData);
router.get("/stats", getProductStats);
router.get("/analysis", getProductAnalysis);

module.exports = router;
