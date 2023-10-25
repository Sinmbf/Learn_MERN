// Es Modules

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";
// import multer from "multer";
// import fs from "fs";
// import path from "path";
// import { dirname } from "path";

// Common Js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User.cjs");
const Post = require("./models/Post.cjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");

const app = express();
const port = 5000;
const JWT_SECRET = "SinmbfLost";

// Multer upload middleware
const uploadMiddleware = multer({
  dest: "uploads/",
});

// Middleware to fix cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware to parse request body
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to upload image from the server uploads folder
app.use("/uploads", express.static(__dirname + "/uploads"));

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
    // Get id of the user
    const { _id, username } = user;
    // If everything is valid then provide a authentication token to the user
    const userData = {
      id: _id,
    };
    // Generate a json web token and send it as response
    const authToken = jwt.sign(userData, JWT_SECRET);
    res.cookie("authToken", authToken).send({
      message: `Welcome ${user.username}`,
      authToken,
      id: _id,
      username,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// ROUTE 3: Show user information using GET : /profile
app.get("/profile", async (req, res) => {
  try {
    // Get the auth token from the cookies
    const { authToken } = req.cookies;
    if (!authToken) {
      return res.status(401).send("Invalid token");
    }
    // Get the user id from the user auth token
    const { id } = jwt.verify(authToken, JWT_SECRET);
    // Find the user information from the id
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    // Send the user id as response
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// ROUTE 4: Logout the user using POST : /logout
app.post("/logout", (req, res) => {
  res.cookie("authToken", "").send("Logged out");
});

// ROUTE 5: Delete all the user account using DELETE : /deleteuser
app.delete("/deleteusers", async (req, res) => {
  try {
    let user = await User.deleteMany({});
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// ROUTE 5: Create a new post using POST : /createpost
app.post("/createpost", uploadMiddleware.single("file"), async (req, res) => {
  try {
    // Get the auth token from the cookies
    const { authToken } = req.cookies;
    if (!authToken) {
      return res.status(401).send("Invalid token");
    }
    // Get the user id from the user auth token
    const { id } = jwt.verify(authToken, JWT_SECRET);
    // Get the post information from the request body
    const { title, summary, content } = req.body;
    // Get the original file name from the request files
    const { originalname, path } = req.file;
    // Rename the original path
    const newPath = "uploads/" + originalname;
    fs.renameSync(path, newPath);
    // Create a new post in the database
    let post = await Post.create({
      author: id,
      title,
      summary,
      content,
      imagePath: newPath,
    });
    res.send({ message: "Successfully created the post", post });
    // res.send({ title, summary, image, content });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// ROUTE 6: Get all the posts using GET : /getposts
app.get("/getposts", async (req, res) => {
  const posts = await Post.find()
    .populate("author", "username")
    .sort({ createdAt: -1 })
    .limit(20);
  if (!posts.length) {
    return res.status(404).send({ message: "No posts available" });
  }
  res.json(posts);
});
