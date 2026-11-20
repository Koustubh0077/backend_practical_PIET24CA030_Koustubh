const express = require("express");
const mongoose = require("mongoose");
const Book = require("../models/Book");

const router = express.Router();

// check the id before using it
function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// POST /books - add a new book
router.post("/", async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
});

// GET /books - get all books
router.get("/", async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
});

// GET /books/:id - get one book
router.get("/:id", async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid book id" });
    }
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
});

// PUT /books/:id - update a book
router.put("/:id", async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid book id" });
    }
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
});

// DELETE /books/:id - delete a book
router.delete("/:id", async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid book id" });
    }
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
