/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Button, Typography } from "@mui/material";
import FormInput from "../components/shared/FormInput";
import { Login } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/useContext";
import { useState } from "react";

const RegisterPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  // Function to handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Creating Account", { id: "register" });
      await auth?.register(name, email, password);
      toast.success("Successfully Registered User " + name, { id: "register" });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed", { id: "register" });
      //@ts-ignore
      setError(error.response.data);
      setTimeout(() => {
        setError("");
      }, 2500);
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Image Box */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <img src="robot-no-bg.png" alt="Robot" width={500} height={500} />
      </Box>
      {/* Form Box */}
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Typography variant="h4" align="center" marginBottom={7}>
          Create A New Account
        </Typography>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={handleSubmit}
        >
          <FormInput label="Name" type="text" name="name" />
          <FormInput
            label="Email"
            type="email"
            name="email"
            error={error && error}
          />
          <FormInput label="Password" type="password" name="password" />
          <Button
            fullWidth
            type="submit"
            variant="outlined"
            sx={{
              padding: ".8rem",
              width: { md: "70%", xs: "80%", lg: "60%" },
            }}
            endIcon={<Login />}
          >
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
};
export default RegisterPage;
