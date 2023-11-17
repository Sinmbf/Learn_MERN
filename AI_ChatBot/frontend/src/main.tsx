import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, createTheme } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
axios.defaults.baseURL = "https://ai-chatbot-backend-n13e.onrender.com/api/v1";
axios.defaults.withCredentials = true;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Toaster position="bottom-left" />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
