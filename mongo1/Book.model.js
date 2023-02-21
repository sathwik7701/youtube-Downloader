const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  author: {
    type: String,
  },
  country: {
    type: String,
  },
  language: {
    type: String,
  },
  link: {
    type: String,
  },

  pages: {
    type: Number,
  },
  title: {
    type: String,
  },
  year: {
    type: Number,
  },
});

const Book = mongoose.model("book", BookSchema);

module.exports = Book;
