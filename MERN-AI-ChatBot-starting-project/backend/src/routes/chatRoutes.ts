import { Router } from "express";
import { verifyToken } from "../utils/tokenManager.js";
import { generateChatCompletion } from "../controllers/chat-controllers.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
const chatRoutes = Router();

/* Protected API */

// CHAT ROUTE 1: Generate chat :/api/v1/chats/new
chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);

export default chatRoutes;
