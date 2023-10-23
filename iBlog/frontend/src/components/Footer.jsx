import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <div className="max-w-2xl p-8 text-slate-950 flex flex-col items-center shadow-md">
      <div className="mb-4">
        <NavLink to="/" className="mx-3">
          Home
        </NavLink>
        <NavLink to="/login" className="mx-3">
          Login
        </NavLink>
        <NavLink to="/register" className="mx-3">
          Register
        </NavLink>
      </div>
      <p className="text-sm">
        Copy right &copy; SinmbfMania. All rights reserved
      </p>
    </div>
  );
};

export default Footer;
