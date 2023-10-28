import { Route, Routes } from "react-router-dom";
import Blogs from "./components/Blogs";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import UserContextProvider from "./context/UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
function App() {
  return (
    <UserContextProvider>
      <main className="max-w-4xl p-2 mx-auto">
        {/* Navigation Bar */}
        <NavBar />
        {/* Available Routes */}
        <div className="container max-w-4xl">
          <Routes>
            <Route index path="/" element={<Blogs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/editpost/:id" element={<EditPost />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </UserContextProvider>
  );
}

export default App;
