import image from "../assets/image1.avif";
const BlogItem = () => {
  return (
    <div className="blog-entry max-w-md mx-10 sm:mx-auto bg-gray-200 rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-8">
      {/* Blog Image */}
      <div className="md:flex">
        <div className="md:shrink-0">
          <img
            src={image}
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
            Incredible appliances for your home
          </a>
          <p className="mt-1 text-slate-700">
            Looking to take your team away on a retreat to enjoy awesome food
            and take in some sunshine? We have a list of places to do just that.
          </p>
          {/* Author and publish time */}
          <div className="mt-3">
            <span className="text-sm font-medium text-indigo-500">
              Sinmbf Lost
            </span>
            <p className="text-sm text-slate-500 inline-block mx-3">
              2023/10/23
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
