import { Route, Routes } from "react-router-dom";
import BlogItem from "./components/BlogItem";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
function App() {
  return (
    <main className="max-w-2xl p-2 mx-auto">
      {/* Navigation Bar */}
      <NavBar />
      {/* Available Routes */}
      <div className="container">
        <Routes>
          <Route index path="/" element={<BlogItem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default App;
