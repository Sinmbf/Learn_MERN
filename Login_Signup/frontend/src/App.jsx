import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Footer from "./components/Footer";
import { useState } from "react";
import Alert from "./components/Alert";

function App() {
  const [alert, setAlert] = useState({ message: "", type: "" });
  const displayAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 2000);
  };
  return (
    <>
      {/* NavBar */}
      <NavBar displayAlert={displayAlert} />
      {/* Alerts */}
      {/* Available Routes */}
      <div className="main">
        <Alert {...alert} />
        <Routes>
          <Route path="/" element={<Home displayAlert={displayAlert} />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={<Login displayAlert={displayAlert} />}
          />
          <Route
            path="/signup"
            element={<SignUp displayAlert={displayAlert} />}
          />
        </Routes>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
