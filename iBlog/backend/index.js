import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const app = express();
const port = 5000;
const JWT_SECRET = "SinmbfLost";

// Middleware to fix cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware to parse request body
app.use(express.json());

// Connect to MongoDB database
const mongoURL =
  "mongodb+srv://sinmbf:sinmbflost@lost.gmlqtoc.mongodb.net/blog-users?retryWrites=true&w=majority";
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDB Atlas successfully");
    app.listen(port, () => {
      console.log(`App listening on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));

// Available Routes

// ROUTE 1: Create a new user account using POST : /register
app.post("/register", async (req, res) => {
  try {
    // Get user details from the req body
    const { username, email, password } = req.body;
    // Check if a user with the same email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(401)
        .send({ error: "Sorry a user with the same email already exists" });
    }
    // Generate a secure password hash along with salt using bcrypt js
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
    // If user doesn't exist then create a new user
    user = await User.create({
      username,
      email,
      password: secPass,
    });
    res.status(201).send({ message: "Account created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// ROUTE 2: Authenticate the user login using POST : /login
app.post("/login", async (req, res) => {
  try {
    // Get user details from the req body
    const { email, password } = req.body;
    // Check if a user with the same email already exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: "Incorrect email or password" });
    }
    // Check if the passwords match the one stored in the database
    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      return res.status(401).send({ error: "Incorrect email or password" });
    }
    // If everything is valid then provide a authentication token to the user
    const userData = {
      id: user._id,
    };
    // Generate a json web token and send it as res ponse
    const authToken = jwt.sign(userData, JWT_SECRET);
    res
      .cookie("authToken", authToken)
      .send({ message: `Welcome ${user.username}`, authToken });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// ROUTE 3: Delete all the user account using DELETE : /deleteuser
app.delete("/deleteusers", async (req, res) => {
  try {
    let user = await User.deleteMany({});
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});
