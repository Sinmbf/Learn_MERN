import { Router } from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/userControllers.js";
import {
  loginValidator,
  registerValidator,
  validate,
} from "../utils/validate.js";
const userRoutes = Router();

// USER ROUTE 1: Get all the users using GET : /api/v1/user
userRoutes.get("/", getUser);

// USER ROUTE 2: Register a user using POST : /api/v1/user/register
userRoutes.post("/register", validate(registerValidator), registerUser);

// USER ROUTE 3: Login a user using POST : /api/v1/user/login
userRoutes.post("/login", validate(loginValidator), loginUser);

export default userRoutes;
