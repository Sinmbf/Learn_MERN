import { Route, Routes } from "react-router-dom";
import Headers from "./components/Headers";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import { useAuth } from "./contexts/useContext";

const App = () => {
  const auth = useAuth();
  return (
    <>
      {/* Headers */}
      <Headers />
      {/* Available Routes */}
      <div
        className="main"
        style={{ marginTop: "5rem", width: "100%", height: "100%" }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {auth?.user && auth?.isLoggedIn && (
            <Route path="/chats" element={<ChatPage />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};
export default App;
