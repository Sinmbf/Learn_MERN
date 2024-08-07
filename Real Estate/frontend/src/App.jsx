import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, About, Profile, LogIn, LogOut, Header, SignUp } from "./index";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/log-out" element={<LogOut />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
