const express = require("express");
const { insertData } = require("../controllers/product_controller");

const router = express.Router();

router.post("/add", insertData);

module.exports = router;
