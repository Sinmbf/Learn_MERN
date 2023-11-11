import { Box, useMediaQuery, useTheme } from "@mui/material";
import TypingAnimation from "../components/shared/TypingAnimation";
import { Footer } from "../components/footer/Footer";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box sx={{ width: "100%", height: "100%", mt: "4rem" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: isBelowMd ? "7rem" : "4rem",
          textAlign: "center",
        }}
      >
        <TypingAnimation />
        {/* Images */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            flexDirection: { md: "row", xs: "column" },
            gap: "3rem",
          }}
        >
          <img src="robot.png" alt="chatbot" width={"200px"} />
          <img
            src="openai.png"
            alt="chatbot"
            width={"200p"}
            className="animate-spin invert"
          />
        </Box>
        <Box
          sx={{
            width: isBelowMd ? "90%" : "80%",
            marginBottom: "3rem",
            boxShadow: "-5px -5px 30px #65F3D5",
          }}
        >
          <img src="chat.png" alt="Chat" />
        </Box>
      </Box>
      {/* Footer */}
      <Footer />
    </Box>
  );
};
export default Home;
