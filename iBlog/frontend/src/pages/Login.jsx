import { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Login = () => {
  const host = "https://iblogs-backend-yhqi.onrender.com";
  const { setUserInfo } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  // Function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the details to the backend server
      const response = await axios.post(`${host}/login`, credentials, {
        withCredentials: true,
      });
      // Send alert
      enqueueSnackbar(response.data.message, { variant: "info" });
      // Set user information
      setUserInfo(response.data);
      // Redirect to the main page if no errors
      navigate("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 2500);
    }
  };
  // Function to handle change
  const handleChange = (e) => {
    setCredentials((currentCredentials) => {
      return { ...currentCredentials, [e.target.name]: e.target.value };
    });
  };
  return (
    <form
      className="grid grid-cols-1 place-items-center border-2 border-indigo-900 p-8 rounded-md h-full max-w-lg mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="text-center text-3xl mb-4 text-indigo-800">
        <h2>Login to your account</h2>
      </div>

      {/* Email */}
      <div className="mb-3 w-full">
        <label className="block text-indigo-800" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="username"
          placeholder="Eg: sinmbf@gmail.com"
          className="border-2 border-indigo-600 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
          required
          onChange={handleChange}
        />
        {/* Email Error Display */}
        <div className="text-sm text-red-700 h-2.5">{error && error}</div>
      </div>
      {/* Password */}
      <div className="mb-4 relative w-full">
        <label className="block text-indigo-800" htmlFor="password">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          autoComplete="password"
          className="inline border-2 border-indigo-600 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
          required
          minLength={5}
          onChange={handleChange}
        />

        <span
          className="absolute translate-y-[40%] right-5 cursor-pointer"
          onClick={() => {
            setShowPassword((currentState) => (currentState ? false : true));
          }}
        >
          <i
            className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
          />
        </span>
        {/* Password Error Display */}
        <div className="text-sm text-red-700 h-2.5">{error && error}</div>
      </div>
      {/* Login button */}
      <button className="p-4 w-full rounded-md bg-indigo-500 text-white hover:bg-indigo-900 hover:text-gray-400 active:bg-white active:text-black">
        Login
      </button>
    </form>
  );
};

export default Login;
