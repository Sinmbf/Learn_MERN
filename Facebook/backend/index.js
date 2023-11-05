import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import cors from "cors";
const mongoURL =
  "mongodb+srv://sinmbf:sinmbflost@lost.gmlqtoc.mongodb.net/fb_loginSignup?retryWrites=true&w=majority";
const app = express();

// Middleware to parse request body
app.use(express.json());
// Middleware to fix cors
app.use(cors());

// Connect to the mongo DB database
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to Mongo DB Atlas successfully");
    app.listen(5000, () => {
      console.log(`App listening on http://localhost:5000`);
    });
  })
  .catch((error) => console.log(error));

// Available Routes
app.use("/api", authRoute);
