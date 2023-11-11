/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Typography } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { GrLogin } from "react-icons/gr";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import {}
const Signup = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  // Check if the user is logged in and if logged in then redirect to chat page
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);
  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Logged In Successfully", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error("Sign Up failed", { id: "signup" });
    }
  };
  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", xs: "none" }}>
        <img src="airobot.png" alt="Robot" style={{ width: "400px" }} />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems="center"
        padding={2}
        marginX={"auto"}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>
            <CustomizedInput type="text" label="Name" name="name" />
            <CustomizedInput type="email" label="Email" name="email" />
            <CustomizedInput type="password" label="Password" name="password" />
            <Button
              type="submit"
              sx={{
                mt: 2,
                color: "black",
                px: 2,
                py: 1,
                width: "100%%",
                bgcolor: "#00fffc",
                borderRadius: 2,
                ":hover": {
                  bgcolor: "white",
                  color: "black ",
                },
              }}
              endIcon={<GrLogin />}
            >
              Signup
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
export default Signup;
