import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: ".7rem",
      }}
    >
      <Link to="/">
        <img
          src="openai.png"
          alt="openai"
          className="w-[30px] h-[30px] invert"
        />
      </Link>
      <Typography
        sx={{
          display: { xs: "none", sm: "block", md: "block" },
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
        }}
      >
        <span className="text-[1.2rem]">MERN</span>-GPT
      </Typography>
    </div>
  );
};
export default Logo;
