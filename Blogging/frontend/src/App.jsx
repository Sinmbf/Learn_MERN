import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import UserAuthForm from "./pages/AuthPages/UserAuthForm";

function App() {
  return (
    <>
      {/* Available Routes */}
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/sign-in" element={<UserAuthForm type="sign-in" />} />
          <Route path="/register" element={<UserAuthForm type="register" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
