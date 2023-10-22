/* eslint-disable react/prop-types */
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = ({ displayAlert }) => {
  const navigate = useNavigate();
  // Helper function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    displayAlert("Logged out successfully", "danger");
    navigate("/login");
  };
  return (
    <nav
      className="navbar navbar-expand-lg bg-black fixed-top"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          i<span className="text-danger">Notebook</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
          </ul>
          {!localStorage.getItem("auth-token") ? (
            <div>
              <NavLink
                to="/login"
                className="btn btn-outline-info"
                tabIndex="-1"
                role="button"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="btn btn-outline-danger mx-2"
                tabIndex="-1"
                role="button"
              >
                Sign Up
              </NavLink>
            </div>
          ) : (
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
