const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Fetch all notes using GET : /api/note/getnotes. Login required.
router.get("/getnotes", fetchUser, async (req, res) => {
  try {
    // Get userId from fetchUser
    const userId = req.userId;
    // Find all the notes by user property
    const notes = await Note.find({ user: userId });
    // Send all the notes as response
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// ROUTE 2: Create new note using POST : /api/note/createnote. Login required.
router.post(
  "/createnote",
  fetchUser,
  [
    body("title", "Please enter a title with minimum 3 characters").isLength({
      min: 3,
    }),
    body("description", "Descriptions must be minimum 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors then send bad request and display the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Get title, description and tag entered by the user
      const { title, description, tag } = req.body;
      const note = new Note({
        user: req.userId,
        title,
        description,
        tag,
      });
      // Save the note to the Mongo DB database
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
);

// ROUTE 3: Update an existing note using PATCH : /api/note/updatenote. Login required
router.patch(
  "/updatenote/:noteId",
  fetchUser,
  [
    body("title", "Please enter a title with minimum 3 characters").isLength({
      min: 3,
    }),
    body("description", "Description must be minimum 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors then send bad request and display the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Get the user id from fetchUser
      const userId = req.userId;
      // Get the note id from the request params
      const noteId = req.params.noteId;
      // Check if the note exists
      let note = await Note.findById(noteId);
      if (!note) {
        return res.status(404).json("Note not found");
      }
      // Check if the note belongs to the user
      if (note.user.toString() !== userId) {
        return res.status(401).json("Not authorized");
      }
      // If the note belongs to the user then get update details
      const { title, description, tag } = req.body;
      // Create a new note for updating
      const newNote = {};
      // Check if title, description and tag are entered
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }
      // If everything is valid then update the note
      note = await Note.findByIdAndUpdate(
        noteId,
        { $set: newNote },
        { new: true }
      );
      res.json(note);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
);

// ROUTE 4: Delete an existing note by using DELETE : /api/note/deletenote. Login required.
router.delete("/deletenote/:noteId", fetchUser, async (req, res) => {
  try {
    // Get the user id from fetchUser
    const userId = req.userId;
    // Get the note id from the request params
    const noteId = req.params.noteId;
    // Check if the note exists
    let note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json("Note not found");
    }
    // Check if the note belongs to the user
    if (note.user.toString() !== userId) {
      return res.status(401).json("Not authorized");
    }

    // If note belongs to the user then delete it
    note = await Note.findByIdAndDelete(noteId);
    res.json({ status: "Success", note });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
