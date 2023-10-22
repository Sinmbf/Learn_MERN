import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router();

// Route 1: Create a new book using POST : /createbook
router.post("/createbook", async (req, res) => {
  try {
    // Get the required fields from the request body
    const { title, author, publishYear } = req.body;
    // Check if all the required fields are provided
    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    // If required fields are provided then create a new book
    const newBook = {
      title,
      author,
      publishYear,
    };
    const book = await Book.create(newBook);
    // Send the created book as response
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
});

// ROUTE 2: Get all the books from the database using GET : /getbooks
router.get("/getbooks", async (req, res) => {
  try {
    const books = await Book.find({});
    if (!books.length) {
      return res.status(404).send({ message: "No books found" });
    }
    return res.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

// ROUTE 3: Get the books by their id from the database using GET : /getbooks
router.get("/getbook/:bookId", async (req, res) => {
  try {
    // Get the book id from the request parameter
    const { bookId } = req.params;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

// ROUTE 4: Update an existing book by id from the database using PATCH : /updatebook
router.patch("/updatebook/:bookId", async (req, res) => {
  try {
    // Get the book id from the request parameter
    const { bookId } = req.params;
    // Get the new book details from request body
    const { title, author, publishYear } = req.body;
    // If the details are provided then create a new book object
    const updatedBook = {};
    if (title) {
      updatedBook.title = title;
    }
    if (author) {
      updatedBook.author = author;
    }
    if (publishYear) {
      updatedBook.publishYear = publishYear;
    }
    // Update the book in the database
    const book = await Book.findByIdAndUpdate(bookId, updatedBook);
    // Check if the book exists
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    // Send the updated success message as response
    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

// ROUTE 5: Delete an existing book by id from the database using DELETE : /deletebook
router.delete("/deletebook/:bookId", async (req, res) => {
  try {
    // Get the book id from the request parameter
    const { bookId } = req.params;
    // Update the book in the database
    const book = await Book.findByIdAndDelete(bookId);
    // Check if the book exists
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    // Send the updated success message as response
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

export default router;
