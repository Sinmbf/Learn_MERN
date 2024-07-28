import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
// Configure environment variable
dotenv.config();

// Create express app
const app = express();
const PORT = 3000;

// By default, JSON can't be sent to the server. So use express.json()
app.use(express.json());

// Connect To MongoDb Atlas
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("Connected To MongoDB Atlas successfully");
  })
  .catch((err) => console.log(err));

// Run server on port
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

// Use Routes (MiddleWares)

// Route 1: /api/user/ Using GET
app.use("/api/user", userRoute);

// Route 2: /api/auth/ Using POSt
app.use("/api/auth", authRoute);

// Middleware to handle error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
