/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import BlogItem from "./BlogItem";
const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  // Function to fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/getposts");
      console.log(response.data);
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  // Fetch all the posts
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <>
      <>
        {loading && (
          <div className="flex justify-center items-center mb-10">
            <div className="animate-spin h-[6rem] w-[6rem] mr-3 rounded-[50%] border-y-indigo-600 border-2"></div>
          </div>
        )}

        {!loading && !posts?.length && (
          <div className="bg-red-500 text-white p-3 rounded-md text-center">
            No posts available!
          </div>
        )}

        {/* BlogItem */}
        {posts.map((post) => (
          <BlogItem key={post._id} {...post} />
        ))}
      </>
    </>
  );
};

export default Blogs;
