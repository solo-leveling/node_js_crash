const express = require("express");
const {
  getAllBooks,
  getSingleBook,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/book_controllers.js");

//create express route
const router = express.Router();

//book routes
router.get("/get", getAllBooks);
router.get("/get/:id", getSingleBook);
router.post("/add", addBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

module.exports = router;
