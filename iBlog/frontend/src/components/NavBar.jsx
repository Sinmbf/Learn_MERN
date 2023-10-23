import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="flex justify-between items-center p-2 mb-[50px] shadow-lg">
      <NavLink to="/" className="text-red-500 text-3xl font-bold">
        iBlog
      </NavLink>
      <nav className="p-3">
        <NavLink
          to="/login"
          className="bg-indigo-600 p-2 rounded-md text-white hover:text-gray-300 mx-1"
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className="bg-indigo-600 p-2 rounded-md text-white hover:text-gray-300 mx-1"
        >
          Register
        </NavLink>
      </nav>
    </header>
  );
};

export default NavBar;
