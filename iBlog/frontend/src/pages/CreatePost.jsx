import axios from "axios";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";

const CreatePost = () => {
  const [postInfo, setPostInfo] = useState({});
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [editorLength, setEditorLength] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // Function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editorLength === 1) {
      enqueueSnackbar("Please fill in the contents", { variant: "warning" });
      return;
    }
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
  // Function to handle handleEditorChange
  const handleEditorChange = (newValue, delta, source, editor) => {
    setEditorLength(editor.getLength);
    setContent(newValue);
  };
  return (
    <>
      <div className="text-center mb-7">
        <h2 className="text-3xl text-indigo-900">Create a new post</h2>
      </div>
      <form
        className="grid grid-cols-1 place-items-center rounded-md p-4 border-2 border-indigo-800 max-w-3xl mx-auto"
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
        <Editor handleEditorChange={handleEditorChange} value={content} />
        {/* Submit button */}
        <button className="p-3 mt-5 tracking-wide text-md text-white bg-indigo-600 rounded-md w-full hover:bg-indigo-800 disabled:bg-indigo-300">
          Create Post
        </button>
      </form>
    </>
  );
};

export default CreatePost;
