import { Router } from "express";
import {
  getAllUsers,
  registerUser,
  loginUser,
  verifyUser,
} from "../controllers/userControllers.js";
import {
  loginValidator,
  registerValidator,
  validate,
} from "../utils/validators.js";
import { verifyToken } from "../utils/tokenManager.js";
const userRoutes = Router();

// USER ROUTE 1: Get all users from the database :/api/v1/user
userRoutes.get("/", getAllUsers);

// USER ROUTE 2: Register a user :/api/v1/user/register
userRoutes.post("/register", validate(registerValidator), registerUser);

// USER ROUTE 3: Login a user :/api/v1/user/login
userRoutes.post("/login", validate(loginValidator), loginUser);

// USER ROUTE 4: Check the auth status of a user :/api/v1/user/auth-status
userRoutes.get("/auth-status", verifyToken, verifyUser);

export default userRoutes;