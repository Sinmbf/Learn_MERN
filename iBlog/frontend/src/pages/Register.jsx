import { useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ emailErr: "", passErr: "" });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  // Function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if both passwords are correct
    const { password, cpassword } = credentials;
    if (password !== cpassword) {
      setError((currentError) => {
        return { ...currentError, passErr: "Passwords don't match" };
      });
      setTimeout(() => {
        setError({ emailErr: "", passErr: "" });
      }, 2500);
      return;
    }
    try {
      // Provide user details to the backend server to create an account
      const response = await axios.post(
        "http://localhost:5000/register",
        credentials
      );
      // Send an alert
      enqueueSnackbar(response.data.message, { variant: "success" });
      // After creating account, redirect to login page
      navigate("/login");
    } catch (error) {
      enqueueSnackbar("Registration failed", {
        variant: "error",
      });
      // Handle the error
      setError((currentError) => {
        return { ...currentError, emailErr: error.response.data.error };
      });
      setTimeout(() => {
        setError({ emailErr: "", passErr: "" });
      }, 2500);
    }
  };

  // Function to handle onChange
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
        <h2>Create a new account</h2>
      </div>
      {/* Username */}
      <div className="mb-3 w-full">
        <label className="block text-indigo-800" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          autoComplete="username"
          placeholder="Eg: Sinmbf"
          className="border-2 border-indigo-600 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
          required
          minLength={3}
          onChange={handleChange}
        />
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
        <div className="text-sm text-red-700 h-2.5">
          {error.emailErr && error.emailErr}
        </div>
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
        <div className="text-sm text-red-700 h-2.5">
          {error.passErr && error.passErr}
        </div>
      </div>
      {/* Confirm Password */}
      <div className="mb-4 relative w-full">
        <label className="block text-indigo-800" htmlFor="cpassword">
          Confirm Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="cpassword"
          name="cpassword"
          autoComplete="cpassword"
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
        <div className="text-sm text-red-700 h-2.5">
          {error.passErr && error.passErr}
        </div>
      </div>
      {/* Register button */}
      <button className="p-4 w-full rounded-md bg-indigo-500 text-white hover:bg-indigo-900 hover:text-gray-400 active:bg-white active:text-black">
        Register
      </button>
    </form>
  );
};

export default Register;
