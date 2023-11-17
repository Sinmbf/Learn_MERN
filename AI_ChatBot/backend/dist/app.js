import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
config();
const app = express();
// Middleware to parse request body
app.use(express.json());
// Middleware to fix cors
app.use(cors({
    origin: "https://ai-chatbot-frontend.onrender.com",
    credentials: true,
}));
// Middleware to show development logs of request, response and status code
app.use(morgan("dev"));
// Middleware to set cookie from frontend to the backend
app.use(cookieParser(process.env.COOKIE_SECRET));
// Main Route
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map