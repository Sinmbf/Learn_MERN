/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { enqueueSnackbar } from "notistack";

const NavBar = () => {
  const context = useContext(UserContext);
  const { userInfo, setUserInfo } = context;
  const navigate = useNavigate();
  const username = userInfo?.username;
  // Function to fetch user information
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/profile", {
        withCredentials: true,
      });

      setUserInfo(response.data);
    } catch (error) {
      console.log(error);
      setUserInfo({});
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  // Function to handle logout
  const handleLogout = async () => {
    await axios.get("http://localhost:5000/logout", {
      withCredentials: true,
    });
    setUserInfo({});
    enqueueSnackbar("Logged out successfully", { variant: "info" });
    navigate("/login");
  };
  return (
    <header className="flex justify-between items-center p-2 mb-[50px] shadow-lg">
      <NavLink
        to={username ? "/" : "/login"}
        className="text-red-500 text-3xl font-bold"
      >
        iBlog
      </NavLink>
      <nav className="p-3">
        {username ? (
          <>
            <NavLink
              to="/createpost"
              className="bg-indigo-600 p-2 rounded-md text-white hover:text-gray-300 mx-1"
            >
              Create New Post
            </NavLink>
            <NavLink
              className="bg-indigo-600 p-2 rounded-md text-white hover:text-gray-300 mx-1"
              onClick={handleLogout}
            >
              Logout
            </NavLink>
          </>
        ) : (
          <>
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
          </>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
