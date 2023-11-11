import axios from "axios";

// Function to login a user
export const loginUser = async (email: string, password: string) => {
  const response = await axios.post("/user/login", { email, password });
  if (response.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await response.data;
  return data;
};

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
    throw new Error("Unable to sign up");
  }
  const data = await response.data;
  return data;
};

// Function to check the auth status of a user
export const checkAuthStatus = async () => {
  const response = await axios.get("/user/auth-status");
  if (response.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await response.data;
  return data;
};

// Function to send chat request
export const sendChatRequest = async (message: string) => {
  const response = await axios.post("/chats/new", { message });
  if (response.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await response.data;
  return data;
};

// Function to get chats of user
export const getAllChats = async () => {
  const response = await axios.get("/chats/getChats");
  if (response.status !== 200) {
    throw new Error("Unable to get chats");
  }
  const data = await response.data;
  return data;
};

// Function to delete chats of user
export const deleteChats = async () => {
  const response = await axios.delete("/chats/delete");
  if (response.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await response.data;
  return data;
};

// Function to logout user
export const logoutUser = async () => {
  const response = await axios.get("/user/logout");
  if (response.status !== 200) {
    throw new Error("Unable to logout");
  }
  const data = await response.data;
  return data;
};
