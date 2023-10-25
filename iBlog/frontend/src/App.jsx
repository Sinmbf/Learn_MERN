import { Route, Routes } from "react-router-dom";
import Blogs from "./components/Blogs";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import { UserContextProvider } from "./context/userContext";
import CreatePost from "./pages/CreatePost";
function App() {
  return (
    <UserContextProvider>
      <main className="max-w-2xl p-2 mx-auto">
        {/* Navigation Bar */}
        <NavBar />
        {/* Available Routes */}
        <div className="container">
          <Routes>
            <Route index path="/" element={<Blogs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/createpost" element={<CreatePost />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </UserContextProvider>
  );
}

export default App;
