import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/verify.js";
const router = express.Router();

// USER ROUTE 1: Get user information using GET : /users/:uid
router.get("/:uid", verifyToken, getUser);

// USER ROUTE 2: Get user friends using GET : /users/:uid/friends
router.get("/:uid/friends", verifyToken, getUserFriends);

// USER ROUTE 3: Add or remove user friends using PATCH  : /users/:uid/:friendId
router.patch("/:uid/:friendId", verifyToken, addRemoveFriend);

export default router;
