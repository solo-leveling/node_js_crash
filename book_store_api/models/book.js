const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title is required."],
    trim: true,
    maxLength: [100, "Book title cannot be more than 100 letters."],
  },
  author: {
    name: String,
    required: [true, "Author name is required."],
    trim: true,
  },
  publish_year: {
    type: Number,
    required: [true, "Publication year is required."],
    min: [1000, "Year must be at least 1000."],
    max: [new Date().getFullYear(), "Year cannot be in the future."],
  },
});

module.exports = mongoose.model("Book", bookSchema);
