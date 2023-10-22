/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const UpdateBook = () => {
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    publishYear: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/getbook/${id}`)
      .then((response) => {
        const { title, author, publishYear } = response.data;
        setBookDetails((currentDetails) => {
          return { ...currentDetails, title, author, publishYear };
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred! Please check console");
        console.log(error);
      });
  }, []);

  // Helper function to handle change
  const handleChange = (e) => {
    setBookDetails((currentDetails) => {
      return { ...currentDetails, [e.target.name]: e.target.value };
    });
  };

  // Helper funciton to handle save book
  const handleUpdateBook = () => {
    console.log(bookDetails);
    const { title, author, publishYear } = bookDetails;
    const data = {
      title,
      author,
      publishYear,
    };
    axios
      .patch(`http://localhost:5000/books/updatebook/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book updated successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occurred! Please check console", {
          variant: "error",
        });
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <div className="text-3xl my-4 text-center">Edit Book</div>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        {/* Title */}
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Title</label>
          <input
            name="title"
            type="text"
            value={bookDetails.title}
            onChange={handleChange}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>
        {/* Author */}
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Author</label>
          <input
            name="author"
            type="text"
            value={bookDetails.author}
            onChange={handleChange}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>
        {/* Publish Year */}
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Published Year</label>
          <input
            name="publishYear"
            type="text"
            value={bookDetails.publishYear}
            onChange={handleChange}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>
        {/* Submit Button */}
        <button className="p-2 bg-sky-300 m-8" onClick={handleUpdateBook}>
          Update Book
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;
