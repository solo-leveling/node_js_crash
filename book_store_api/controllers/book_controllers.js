const Book = require("../models/Book.js");

//get all books
const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({});
    if (allBooks?.length > 0) {
      res.status(200).json({
        success: true,
        message: "Lists of books fetched successfully.",
        data: allBooks,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Can't find books' data.",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again.",
    });
  }
};

//get a single book
const getSingleBook = async (req, res) => {
  try {
    const getBookById = req.params.id;
    const bookDetailbyId = await Book.findById(getBookById);

    if (!bookDetailbyId) {
      return res.status(404).json({
        success: false,
        message:
          "Book with current id is not found.Please try with different id",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Book found successfully.",
        data: bookDetailbyId,
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again.",
    });
  }
};

//add new books
const addBook = async (req, res) => {
  try {
    const newBookFormData = req.body;
    const newlyCreatedBook = await Book.create(newBookFormData);
    if (newlyCreatedBook) {
      res.status(200).json({
        success: true,
        message: "New Book added.",
        data: newlyCreatedBook,
      });
    } else {
      res.status(404).json({
        message: "Error",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again.",
      error: e.message,
    });
  }
};

//update book
const updateBook = async (req, res) => {
  try {
    const updateFormData = req.body;
    const updateFormID = req.params.id;
    const selectBook = await Book.findByIdAndUpdate(
      updateFormID,
      updateFormData,
      { new: true }
    );
    console.log(selectBook);
    if (selectBook) {
      res.status(200).json({
        success: true,
        message: "Book is updated successfully.",
        data: selectBook,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Error Updating Book",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again.",
      error: e.message,
    });
  }
};

//delete book
const deleteBook = async (req, res) => {
  try {
    const deleteData = await Book.findByIdAndDelete(req.params.id);
    if (deleteData) {
      res.status(200).json({
        success: true,
        message: "Data deleted successfully",
        data: deleteData,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Data can't find",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again.",
    });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  addBook,
  updateBook,
  deleteBook,
};
