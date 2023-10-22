/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import NoteContext from "../context/NoteContext";

const AddNote = ({ displayAlert }) => {
  // Get addNote function from the useContext
  const context = useContext(NoteContext);
  const { createNote } = context;
  // State for notes
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  // Helper function to handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Get user input from the form
    const { title, description, tag } = note;

    createNote(title, description, tag);
    displayAlert("New note added!", "success");
    setNote({ title: "", description: "", tag: "" });
  };
  const handleChange = (e) => {
    setNote((currentNote) => {
      return { ...currentNote, [e.target.name]: e.target.value };
    });
  };
  return (
    <form
      className="form col-md-6 border border-2 border-light rounded p-4 mb-5"
      onSubmit={handleSubmit}
    >
      {/* Title */}
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          value={note.title}
          name="title"
          type="text"
          className="form-control"
          id="title"
          aria-describedby="titleHelp"
          minLength={3}
          maxLength={25}
          required
          onChange={handleChange}
        />
      </div>
      {/* Description */}
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          value={note.description}
          name="description"
          type="text"
          className="form-control"
          id="description"
          minLength={5}
          required
          onChange={handleChange}
          style={{ padding: ".8rem 0 3rem .8rem" }}
        />
      </div>
      {/* Tag */}
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          Tag
        </label>
        <input
          value={note.tag}
          maxLength={25}
          name="tag"
          type="text"
          className="form-control"
          id="tag"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Add Note
      </button>
    </form>
  );
};

export default AddNote;
