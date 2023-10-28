import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const BlogItem = ({
  _id,
  author,
  title,
  summary,
  imagePath,
  createdAt,
  updatedAt,
}) => {
  return (
    <div className="blog-entry max-w-3xl mx-3 bg-gray-200 rounded-xl shadow-md overflow-hidden md:max-w-4xl mb-8 md:mx-3">
      {/* Blog Image */}
      <div className="md:flex">
        <div className="md:shrink-0">
          <Link to={`/post/${_id}`}>
            <img
              src={"http://localhost:5000/" + imagePath}
              alt=""
              className="w-full h-50 object-cover md:h-full md:w-64"
            />
          </Link>
        </div>
        {/* Blog Information */}
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-violet-800 font-semibold">
            A Blog
          </div>
          <Link
            to={`/post/${_id}`}
            className="block mt-1 text-lg leading-tight font-medium text-slate-800 hover:underline"
          >
            {title}
          </Link>
          <p className="mt-1 text-slate-700">{summary}</p>
          {/* Author and publish time */}
          <div className="mt-3">
            <span className="text-sm font-medium text-indigo-500">
              By {author.username}
            </span>
            <p className="text-sm text-slate-500">
              {new Date(createdAt).toString()}
            </p>
            <p className="text-sm text-slate-500">
              <strong>Last updated:</strong>{" "}
              {new Date(updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
