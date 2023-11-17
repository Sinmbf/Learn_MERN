import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import TypingAnimation from "../components/TypingAnimation";

/* eslint-disable react-hooks/exhaustive-deps */
const HomePage = () => {
  const theme = useTheme();
  const isMobileDevice = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
      }}
    >
      <TypingAnimation />
      {/* Images */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 3,
          alignItems: { xs: "center" },
        }}
      >
        <img
          src="whiterobo2nobg.png"
          alt=""
          style={{ width: isMobileDevice ? "35%" : "25%" }}
        />
        <img
          src="chat.png"
          alt=""
          style={{
            width: isMobileDevice ? "100%" : "70%",
            boxShadow: "-10px -10px 30px #004D57",
          }}
        />
      </Box>
    </Container>
  );
};
export default HomePage;
