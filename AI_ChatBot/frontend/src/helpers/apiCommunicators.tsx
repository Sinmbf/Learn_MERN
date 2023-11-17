import axios from "axios";

// Function to get a user

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
  if (response.status !== 201) {
    throw new Error("Unable to register user");
  }
  const data = response.data;
  return data;
};

// Function to login a user
export const loginUser = async (email: string, password: string) => {
  const response = await axios.post("/user/login", { email, password });
  if (response.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = response.data;
  return data;
};

// Function to check the auth status of a user
export const checkAuthStatus = async () => {
  const response = await axios.get("/user/auth-status");
  if (response.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = response.data;
  return data;
};

// Function to logout a user
export const logoutUser = async () => {
  const response = await axios.get("/user/logout");
  if (response.status !== 200) {
    throw new Error("Unable to logout");
  }
  const data = response.data;
  return data;
};

// Function to get all the chats of the user
export const getChats = async () => {
  const response = await axios.get("/chats");
  if (response.status !== 200) {
    throw new Error("Unable to get chats of the user");
  }
  const data = response.data;
  return data;
};

// Function to generate the chats of the user
export const generateNewChat = async (message: string) => {
  const response = await axios.post("/chats/new", { message });
  if (response.status !== 200) {
    throw new Error("Unable to generate chats of the user");
  }
  const data = response.data;
  return data;
};

// Function to delete the chats of the user
export const deleteChats = async () => {
  const response = await axios.delete("/chats/delete");
  if (response.status !== 200) {
    throw new Error("Unable to delete chats of the user");
  }
  const data = response.data;
  return data;
};
