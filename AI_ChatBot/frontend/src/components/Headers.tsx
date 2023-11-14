import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import LinkButtons from "./shared/LinkButtons";
import { useAuth } from "../contexts/useContext";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useNavigate } from "react-router-dom";

const Headers = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <Box>
      <AppBar position="fixed" sx={{ color: "white" }}>
        <Toolbar>
          <IconButton size="large" onClick={() => navigate("/")}>
            <SmartToyIcon fontSize="large" />
          </IconButton>
          <Typography
            sx={{ flexGrow: 1, fontSize: ".9rem" }}
            component={"span"}
          >
            <span style={{ fontWeight: "700" }}>MERN - </span> GPT
          </Typography>
          {/* Links */}
          {auth?.isLoggedIn ? (
            <>
              <LinkButtons text="Go to Chat" bgcolor="primary" to="/chats" />
              <LinkButtons text="Logout" bgcolor="error" to="/" />
            </>
          ) : (
            <>
              <LinkButtons text="Login" bgcolor="primary" to="/login" />
              <LinkButtons text="Register" bgcolor="success" to="/register" />
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Headers;
