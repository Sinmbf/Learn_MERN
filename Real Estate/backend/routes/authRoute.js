import express from "express";
import { signUp } from "../controllers/authController.js";

const router = express.Router();

// Route 2: /api/auth/
router.post("/sign-up", signUp);

export default router;
