import { Router } from "express";
import {
  getAllUsers,
  loginUser,
  logoutUser,
  registerUser,
  verifyUser,
} from "../controllers/userControllers.js";
import {
  loginValidator,
  registerValidator,
  validate,
} from "../utils/validate.js";
import { verifyToken } from "../utils/tokenManager.js";
const userRoutes = Router();

// USER ROUTE 1: Get all the users using GET : /api/v1/user
userRoutes.get("/", getAllUsers);

// USER ROUTE 2: Register a user using POST : /api/v1/user/register
userRoutes.post("/register", validate(registerValidator), registerUser);

// USER ROUTE 3: Login a user using POST : /api/v1/user/login
userRoutes.post("/login", validate(loginValidator), loginUser);

// USER ROUTE 4: Check the auth status of a user using GET : /api/v1/user/auth-status
userRoutes.get("/auth-status", verifyToken, verifyUser);

// USER ROUTE 5: Logout the user using GET : /api/v1/user/auth-status
userRoutes.get("/logout", verifyToken, logoutUser);

export default userRoutes;
