import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

// AUTH ROUTE 2: User login using POST : /auth/login
router.post("/login", login);

export default router;
