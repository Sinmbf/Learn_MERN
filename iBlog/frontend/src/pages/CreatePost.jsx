import axios from "axios";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const CreatePost = () => {
  const [postInfo, setPostInfo] = useState({});
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // Function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", postInfo.title);
    data.set("summary", postInfo.summary);
    data.set("content", content);
    data.set("file", file[0]);
    try {
      // Send the information to the backend server
      const response = await axios.post(
        "http://localhost:5000/createpost",
        data,
        { withCredentials: true }
      );
      // Send alert to the user
      enqueueSnackbar(response.data.message, { variant: "success" });
      // Redirect to the home page
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  // Function to handle change
  const handleChange = (e) => {
    setPostInfo((currentInfo) => {
      return { ...currentInfo, [e.target.name]: e.target.value };
    });
  };
  //   console.log(content);
  return (
    <>
      <div className="text-center mb-7">
        <h2 className="text-3xl text-indigo-900">Create a new post</h2>
      </div>
      <form
        className="grid grid-cols-1 place-items-center rounded-md p-4 border-2 border-indigo-800 max-w-2xl mx-auto"
        onSubmit={handleSubmit}
      >
        {/* Title */}
        <div className="mb-3 w-full">
          <label htmlFor="title" className="block">
            Title
          </label>
          <input
            className="border-2 w-full border-indigo-600 rounded-md p-2 focus:outline-none focus:border-indigo-400"
            name="title"
            id="title"
            placeholder="Enter title"
            required
            minLength={3}
            onChange={handleChange}
          />
        </div>
        {/* Summary */}
        <div className="mb-3 w-full">
          <label htmlFor="summary" className="block">
            Summary
          </label>
          <textarea
            className="border-2 w-full border-indigo-600 rounded-md p-2 focus:outline-none focus:border-indigo-400 h-[7rem]"
            name="summary"
            id="summary"
            placeholder="Enter post summary"
            required
            minLength={5}
            onChange={handleChange}
          />
        </div>
        {/* File */}
        <div className="mb-4 w-full">
          <label htmlFor="image" className="block">
            Image
          </label>
          <input
            type="file"
            className="border-2 w-full border-indigo-600 rounded-md p-2 focus:outline-none focus:border-indigo-400"
            name="image"
            id="image"
            required
            onChange={(e) => setFile(e.target.files)}
          />
        </div>
        {/* Description */}
        <ReactQuill
          className="w-full h-[20rem] mb-16"
          modules={modules}
          formats={formats}
          onChange={(newValue) => setContent(newValue)}
        />
        {/* Submit button */}
        <button className="p-3 mt-5 tracking-wide text-md text-white bg-indigo-600 rounded-md w-full hover:bg-indigo-800">
          Create Post
        </button>
      </form>
    </>
  );
};

export default CreatePost;
