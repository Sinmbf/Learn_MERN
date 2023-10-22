/* eslint-disable react/prop-types */
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const host = "https://inotebook-backend-x7v4.onrender.com/api/note";
  // API Call

  // Helper function to fetch all notes
  const fetchAllNotes = async () => {
    const url = `${host}/getnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };
  // Helper function to add new notes
  const createNote = async (title, description, tag) => {
    !tag && (tag = "General");
    const url = `${host}/createnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    setNotes(notes.concat(json));
  };
  // Helper function to update existing notes
  const updateNote = async (id, title, description, tag) => {
    !tag && (tag = "General");
    const url = `${host}/updatenote/${id}`;
    await fetch(url, {
      method: "PATCH",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // Update note in the client side
    const newNote = notes.slice(); // Create a copy of notes
    newNote.map((note) => {
      if (note._id === id) {
        note.title = title;
        note.description = description;
        note.tag = tag;
      }
    });
    setNotes(newNote);
  };
  // Helper function to delete existing notes
  const deleteNote = async (id) => {
    const url = `${host}/deletenote/${id}`;
    await fetch(url, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    // Delete note in the client side
    const filteredNote = notes.filter((note) => note._id !== id);
    setNotes(filteredNote);
  };
  return (
    <NoteContext.Provider
      value={{ notes, fetchAllNotes, createNote, updateNote, deleteNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
