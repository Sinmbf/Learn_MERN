/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ displayAlert }) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // Helper function to handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const host = "https://login-signup-backend-m7wz.onrender.com/api/auth";
    const url = `${host}/createuser`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    if (json.error) {
      setError(json.error);
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    displayAlert(`Welcome ${name}!`, "success");
    navigate("/login");
  };
  // Helper function to handle change
  const handleChange = (e) => {
    setCredentials((currentCredentials) => ({
      ...currentCredentials,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="text-center text-light">
          <h2 className="title">Create A New Account</h2>
        </div>
        <form
          className="col-11 col-md-5 mt-4 border border-2 border-light p-4 rounded"
          onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              name="name"
              minLength={3}
              type="text"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
              required
              onChange={handleChange}
            />
          </div>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              required
              onChange={handleChange}
            />
            <div
              id="emailHelp"
              className="form-text text-danger"
              style={{ height: ".6rem" }}>
              {error && error}
            </div>
          </div>
          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              name="password"
              minLength={5}
              type="password"
              className="form-control"
              id="password"
              required
              onChange={handleChange}
            />
            <div
              id="passwordHelp"
              className="form-text text-danger"
              style={{ height: ".6rem" }}>
              {credentials.password !== credentials.cpassword &&
                "Passwords don't match"}
            </div>
          </div>
          {/* Confirm Password */}
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              name="cpassword"
              minLength={5}
              type="password"
              className="form-control"
              id="cpassword"
              required
              onChange={handleChange}
            />
            <div
              id="cpasswordHelp"
              className="form-text text-danger"
              style={{ height: ".6rem" }}>
              {credentials.password !== credentials.cpassword &&
                "Passwords don't match"}
            </div>
          </div>

          <button
            disabled={credentials.password !== credentials.cpassword}
            type="submit"
            className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
