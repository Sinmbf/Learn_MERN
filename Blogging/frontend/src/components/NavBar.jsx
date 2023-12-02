import { Link, Outlet } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { FaUserPlus } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { useState } from "react";

const NavBar = () => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  return (
    <>
      <nav className="navbar">
        {/* Image Link */}
        <Link to="/">
          <img src="logo.png" alt="logo" className="w-10" />
        </Link>
        {/* Search Bar */}
        <div
          className={
            "w-full px-[1rem] md:p-0 absolute top-full left-0 sm:static sm:showSearchBar " +
            (isSearchBarVisible ? "showSearchBar" : "hideSearchBar")
          }
        >
          <input type="text" placeholder="Search" className="searchInput" />
          <FaSearch className="searchIcon" />
        </div>

        {/* Toggle Search Button */}
        <div className="flex items-center justify-center ml-auto h-12 w-12 rounded-full bg-gray-300 sm:hidden">
          <FaSearch
            className="text-xl cursor:pointer "
            onClick={() => setIsSearchBarVisible((currentVal) => !currentVal)}
          />
        </div>

        {/* Link 1 */}
        <Link to="/editor" className="link">
          <TfiWrite className="text-xl" />
          <p>Write</p>
        </Link>

        {/* Link 2 */}
        <Link
          to="/sign-in"
          className="flex-none flex items-center gap-1 p-2 rounded-md bg-slate-950 text-white hover:bg-opacity-80"
        >
          <p>Sign In</p>
          <MdLogin className="text-md" />
        </Link>

        {/* Link 3 */}
        <Link
          to="/register"
          className="hidden sm:flex items-center gap-1 p-2 rounded-md bg-slate-200 text-black hover:bg-opacity-80"
        >
          <FaUserPlus className="text-md" />
          <p>Register</p>
        </Link>
      </nav>
      <Outlet />
    </>
  );
};
export default NavBar;
