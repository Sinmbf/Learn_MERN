import { Router } from "express";
import { verifyToken } from "../utils/tokenManager.js";
import {
  deleteChats,
  generateNewChat,
  getAllChats,
} from "../controllers/chatControllers.js";
const chatRouter = Router();

// CHAT ROUTE 1: Get all the chats of the user using GET : /api/v1/chats/
chatRouter.get("/", verifyToken, getAllChats);

// CHAT ROUTE 2: Generate chats for the user using POST : /api/v1/chats/new
chatRouter.post("/new", verifyToken, generateNewChat);

// CHAT ROUTE 3: Generate chats for the user using POST : /api/v1/chats/new
chatRouter.delete("/delete", verifyToken, deleteChats);

export default chatRouter;
