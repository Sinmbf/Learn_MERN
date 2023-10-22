/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ displayAlert }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // useEffect(() => {
  //   localStorage.getItem("auth-token") && localStorage.removeItem("auth-token");
  //   navigate("/login");
  // }, []);
  // Helper function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get the email and password entered by the client
      const { email, password } = credentials;
      const url =
        "https://login-signup-backend-m7wz.onrender.com/api/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      if (json.error) {
        setError(json.error);
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }
      localStorage.setItem("auth-token", json.authToken);
      displayAlert("Logged in successfully", "success");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  // Helper function to handle change
  const handleChange = (e) => {
    setCredentials((currentCredentials) => {
      return { ...currentCredentials, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="container" style={{ marginTop: "3.5rem", padding: "5em" }}>
      <div className="row justify-content-center">
        <div className="text-center text-light">
          <h2>Login To Your Account</h2>
        </div>
        <form
          className="col-11 col-md-5 mt-4 border border-2 border-light p-4 rounded"
          onSubmit={handleSubmit}
        >
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
              style={{ height: ".6rem" }}
            >
              {error && error}
            </div>
          </div>
          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              minLength={5}
              name="password"
              type="password"
              className="form-control"
              id="password"
              required
              onChange={handleChange}
            />
            <div
              id="passwordHelp"
              className="form-text text-danger"
              style={{ height: ".6rem" }}
            >
              {error && error}
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  displayAlert: PropTypes.func,
};

export default Login;
