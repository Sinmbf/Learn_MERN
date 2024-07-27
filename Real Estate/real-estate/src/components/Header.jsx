import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md">
      <nav className="flex justify-between items-center  max-w-5xl mx-auto p-3">
        {/* Logo */}
        <Link to="/">
          <h1 className="font-bold text-md sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Lost</span>
            <span className="text-slate-800">Estate</span>
          </h1>
        </Link>
        {/* Search Bar */}
        <form className="bg-slate-100 rounded-lg flex items-center">
          <input type="text" placeholder="Search" className="searchBar" />
          <FaSearch className="text-slate-500 mr-2 cursor-pointer" />
        </form>
        {/* Links */}
        <ul className="flex gap-3">
          {/* Home */}
          <Link to="/">
            <li className="hidden sm:block cursor-pointer text-slate-700 hover:text-slate-500  hover:underline">
              Home
            </li>
          </Link>
          {/* About */}
          <Link to="/about">
            <li className="hidden sm:block cursor-pointer text-slate-700 hover:text-slate-500 hover:underline">
              About
            </li>
          </Link>
          {/* Log In */}
          <Link to="/log-in">
            <li className="cursor-pointer text-slate-700 hover:text-slate-500 hover:underline">
              Log In
            </li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
