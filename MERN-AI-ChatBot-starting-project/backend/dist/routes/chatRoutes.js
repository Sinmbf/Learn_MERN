import { Router } from "express";
import { verifyToken } from "../utils/tokenManager.js";
import { deleteChats, generateChatCompletion, getAllChats, } from "../controllers/chat-controllers.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
const chatRoutes = Router();
/* Protected API */
// CHAT ROUTE 1: Generate chat :/api/v1/chats/new
chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken, generateChatCompletion);
// CHAT ROUTE 2: Get all the chats of the user :/api/v1/chats/getChats
chatRoutes.get("/getChats", verifyToken, getAllChats);
// CHAT ROUTE 2: Delete all the chats of the user :/api/v1/chats/getChats
chatRoutes.delete("/delete", verifyToken, deleteChats);
export default chatRoutes;
//# sourceMappingURL=chatRoutes.js.map