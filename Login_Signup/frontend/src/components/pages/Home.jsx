/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = ({ displayAlert }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      displayAlert("Login or create an account to have access", "info");
      navigate("/login");
    }
  }, []);
  return (
    <>
      {localStorage.getItem("auth-token") && (
        <div className="text-light">This is home</div>
      )}
    </>
  );
};

Home.propTypes = {
  displayAlert: PropTypes.func,
};

export default Home;
