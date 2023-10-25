/* eslint-disable react/prop-types */
import image from "../assets/image1.avif";
const BlogItem = ({
  author,
  title,
  summary,
  content,
  imagePath,
  createdAt,
  updatedAt,
}) => {
  return (
    <div className="blog-entry max-w-md mx-10 sm:mx-auto bg-gray-200 rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-8">
      {/* Blog Image */}
      <div className="md:flex">
        <div className="md:shrink-0">
          <img
            src={"http://localhost:5000/" + imagePath}
            alt=""
            className="w-full h-50 object-cover md:h-full md:w-48"
          />
        </div>
        {/* Blog Information */}
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-violet-800 font-semibold">
            A Blog
          </div>
          <a
            href=""
            className="block mt-1 text-lg leading-tight font-medium text-slate-800 hover:underline"
          >
            {title}
          </a>
          <p className="mt-1 text-slate-700">{summary}</p>
          {/* Author and publish time */}
          <div className="mt-3">
            <span className="text-sm font-medium text-indigo-500">
              By {author.username}
            </span>
            <p className="text-sm text-slate-500">
              {new Date(createdAt).toString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
