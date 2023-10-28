/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";

const EditPost = () => {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState({});
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [editorLength, setEditorLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // Function to fetch post to be edited
  const fetchPosts = async () => {
    const response = await axios.get(`http://localhost:5000/fetchpost/${id}`);
    setPostInfo(response.data);
    setContent(response.data.content);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to handle submit and edit post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editorLength === 1) {
      enqueueSnackbar("Please fill in the contents", { variant: "warning" });
      return;
    }
    let newData = new FormData();
    newData.set("title", postInfo.title);
    newData.set("summary", postInfo.summary);
    newData.set("content", content);
    newData.set("file", file[0]);
    try {
      setLoading(true);
      const response = await axios.patch(
        `http://localhost:5000/editpost/${id}`,
        newData,
        { withCredentials: true }
      );
      enqueueSnackbar(response.data.message, { variant: "success" });
      setLoading(false);
      navigate("/post/" + id);
    } catch (error) {
      setLoading(false);
      console.log(error);
      enqueueSnackbar(error.response.data, { variant: "error" });
    }
  };
  // Function to handle change
  const handleChange = (e) => {
    setPostInfo((currentInfo) => {
      return { ...currentInfo, [e.target.name]: e.target.value };
    });
  };
  // Function to handle editor change
  const handleEditorChange = (newValue, delta, source, editor) => {
    setContent(newValue);
    setEditorLength(editor.getLength());
  };
  return (
    <>
      {loading ? (
        <div className="animate-spin w-[6rem] h-[6rem] rounded-[50%] border-2 border-y-indigo-600 max-w-4xl mx-auto"></div>
      ) : (
        <>
          <div className="text-center mb-7">
            <h2 className="text-3xl text-indigo-900">Edit the post </h2>
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
                value={postInfo.title || ""}
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
                value={postInfo.summary}
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
                onChange={(e) => setFile(e.target.files)}
              />
            </div>
            {/* Description */}
            <Editor value={content} handleEditorChange={handleEditorChange} />
            {/* Submit button */}
            <button className="p-3 mt-5 tracking-wide text-md text-white bg-indigo-600 rounded-md w-full hover:bg-indigo-800">
              Update Post
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default EditPost;
