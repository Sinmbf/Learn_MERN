import express from "express";
import { userController } from "../controllers/userController.js";

const router = express.Router();

// Route 1: Using get => '/'
router.get("/test", userController);

export default router;
