import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const CreateBook = () => {
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    publishYear: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Helper function to handle change
  const handleChange = (e) => {
    setBookDetails((currentDetails) => {
      return { ...currentDetails, [e.target.name]: e.target.value };
    });
  };

  // Helper funciton to handle save book
  const handleSaveBook = () => {
    const { title, author, publishYear } = bookDetails;
    const data = {
      title,
      author,
      publishYear,
    };
    axios
      .post("http://localhost:5000/books/createbook", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book creation successfull", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occurred! Please check the console", {
          variant: "error",
        });
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <div className="text-3xl my-4 text-center">Create Book</div>
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
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
          Save Book
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
