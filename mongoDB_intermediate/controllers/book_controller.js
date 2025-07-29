const Author = require("../models/Author");
const Book = require("../models/Book");

const createAuthor = async (req, res) => {
  try {
    const newAuthor = new Author(req.body);
    await newAuthor.save();
    res.status(201).json({
      success: true,
      data: newAuthor,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating author.",
    });
  }
};

const createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json({
      success: true,
      data: newBook,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating book.",
    });
  }
};

const getBookWithAuthor = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author");
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "No data",
      });
    }

    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while getting Book.",
    });
  }
};

module.exports = { createAuthor, createBook, getBookWithAuthor };
