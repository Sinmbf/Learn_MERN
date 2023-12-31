/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PostPage = () => {
  const host = "https://iblogs-backend-yhqi.onrender.com";
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState({});
  const [loading, setLoading] = useState(false);
  const { title, imagePath, content, createdAt, author } = singlePost;
  // Function to fetch post
  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${host}/fetchpost/${id}`);
      setSinglePost(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center mb-10">
          <div className="animate-spin h-[6rem] w-[6rem] mr-3 rounded-[50%] border-y-indigo-600 border-2"></div>
        </div>
      )}

      <div className="PostPage flex flex-col items-center gap-3 max-w-4xl mx-2">
        {/* Title */}
        <h2 className="text-4xl mb-3 text-indigo-600 self-start">{title}</h2>

        <div className="self-start">
          {/*  Author*/}
          <p className="text-md text-violet-700 font-semibold inline me-5">
            By {author?.username && author.username}
          </p>
          {/* Created At */}
          <span className="text-sm text-slate-600">
            {new Date(createdAt).toLocaleString()}
          </span>
        </div>

        {/* Edit Link */}
        {userInfo?._id === singlePost?.author?._id && (
          <div className="flex gap-2 self-start">
            <div className="self-start bg-teal-500 cursor-pointer p-2 rounded hover:bg-teal-600">
              {/* Edit Post */}
              <Link
                className="text-xl mb-3"
                to={`/editpost/${singlePost._id}`}
                style={{ color: "white", textDecoration: "none" }}
              >
                <i className="fa-solid fa-pen-to-square me-1"></i>
                <span>Edit post</span>
              </Link>
            </div>
            <div className="self-start bg-red-500 cursor-pointer p-2 rounded hover:bg-red-600 text-center">
              {/* Edit Post */}
              <Link
                className="text-xl mb-3"
                to={`/deletepost/${singlePost._id}`}
                style={{ color: "white", textDecoration: "none" }}
              >
                <i className="fa-solid fa-pen-to-square me-1"></i>
                <span>Delete post</span>
              </Link>
            </div>
          </div>
        )}

        {/* Image */}
        <div className="w-full h-full mb-3">
          <img
            className="w-full h-full rounded"
            src={`${host}/` + imagePath}
            alt=""
          />
        </div>
        {/* Content */}
        <div
          className="text-slate-700 leading-7 tracking-wide"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </>
  );
};

export default PostPage;
