import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
config();
const app = express();

/* MIDDLEWARES */

// Middleware to parse request body
app.use(express.json());

// Morgan gives log description about what type of request was handled and what was the response and status code

// Remove it in production
app.use(morgan("dev"));

// Middleware to send cookie from the backend to the frontend
app.use(cookieParser(process.env.COOKIE_SECRET));

// Main Route
app.use("/api/v1", appRouter);
export default app;
