import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/Signup";
import Footer from "./components/Footer";
import Alert from "./components/Alert";
import { useState } from "react";
import NoteState from "./context/NoteState";

function App() {
  const [alert, setAlert] = useState({ message: "", type: "" });
  const displayAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 3000);
  };
  return (
    <>
      <NoteState>
        {/* Navigation Bar */}
        <NavBar displayAlert={displayAlert} />

        {/* Available Routes */}
        <div className="main">
          {/* Alert */}
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
      </NoteState>
    </>
  );
}

export default App;
