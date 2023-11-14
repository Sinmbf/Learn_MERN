import axios from "axios";

// Function to register a user
export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await axios.post("/user/register", {
    name,
    email,
    password,
  });
  return response;
};
// Function to login a user
export const loginUser = async (email: string, password: string) => {
  const response = await axios.post("/user/login", { email, password });
  return response;
};
