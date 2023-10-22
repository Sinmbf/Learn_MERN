import { useContext } from "react";
import NoteContext from "../context/NoteContext";

/* eslint-disable react/prop-types */
const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  return (
    <div className="col-md-3 m-3">
      <div className="card h-100 text-bg-dark">
        <div className="card-body text-center">
          <h5 className="card-title text-light mb-3" style={{ height: "3rem" }}>
            {props.title}
          </h5>
          <span
            className="badge text-bg-primary p-2"
            style={{ height: "1.8rem" }}
          >
            {props.tag}
          </span>

          <p className="card-text mt-4 text-info">{props.description}</p>
        </div>
        <div className="card-footer text-warning text-center p-3">
          {props.date.slice(0, 10) + " at " + props.date.slice(11, 19)}
        </div>
        <div className="card-footer text-center p-3 fs-5">
          <i
            className="fa-solid fa-trash text-danger mx-2"
            onClick={() => {
              deleteNote(props._id);
              setTimeout(() => {
                props.displayAlert("Deleted the note", "danger");
              }, 600);
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square text-success mx-2"
            data-bs-toggle="modal"
            data-bs-target="#updateModal"
            onClick={() => props.changeNote(props)}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
