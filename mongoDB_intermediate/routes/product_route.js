const express = require("express");
const {
  insertData,
  getProductStats,
} = require("../controllers/product_controller");

const router = express.Router();

router.post("/add", insertData);
router.get("/stats", getProductStats);

module.exports = router;
