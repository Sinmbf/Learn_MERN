/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { enqueueSnackbar } from "notistack";

const NavBar = () => {
  const host = "https://iblogs-backend-yhqi.onrender.com";
  const context = useContext(UserContext);
  const { userInfo, setUserInfo } = context;
  const navigate = useNavigate();
  const username = userInfo?.username;
  // Function to fetch user information
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${host}/profile`, {
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
    await axios.get(`${host}/logout`, {
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
      <nav className="p-3 flex items-center justify-center gap-3">
        {username ? (
          <>
            <div className="user-profile flex flex-col items-center rounded-md p-1 border-2 border-indigo-500 justify-center cursor-default">
              <i className="fa-solid fa-user text-xl text-indigo-500" />
              <p className="text-indigo-700 text-xs text-center">{username}</p>
            </div>

            <NavLink
              to="/createpost"
              className="bg-indigo-600 p-2 rounded-md text-white hover:text-gray-300 text-center text-xs md:text-lg"
            >
              Create Post
            </NavLink>
            <NavLink
              className="bg-indigo-600 p-2 rounded-md text-white hover:text-gray-300 text-xs md:text-lg text-center"
              onClick={handleLogout}
            >
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="bg-indigo-600 p-2 rounded-md text-white hover:text-gray-300"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="bg-indigo-600 p-2 rounded-md text-white hover:text-gray-300"
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
