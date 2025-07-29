const express = require("express");
const {
  createAuthor,
  createBook,
  getBookWithAuthor,
} = require("../controllers/book_controller");

const router = express.Router();

router.post("/author", createAuthor);
router.post("/book", createBook);
router.get("/get/:id", getBookWithAuthor);

module.exports = router;
