import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// Configure environment variable
dotenv.config();

// Create express app
const app = express();
const PORT = 3000;

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
