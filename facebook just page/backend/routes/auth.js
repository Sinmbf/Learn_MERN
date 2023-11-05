import express from "express";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// ROUTE 1: Register a user using POST : /api/register
router.post(
  "/register",
  [
    body("username", "Username must be minimum 3 characters").isLength({
      min: 3,
    }),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password must be minimum 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Check if there is any error with the user input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    try {
      // Get the user credentials from the request body
      const { username, email, password } = req.body;
      // Check if a user with the same email already exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(401)
          .send("Sorry a user with the same email already exists");
      }
      // Generate a password hash along with salt
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      // If the user doesn't exist then create a new one
      user = await User.create({
        username,
        email,
        password: passwordHash,
      });
      res.send({ message: "Account created successfully", user });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

// ROUTE 2: Login a user using POST : /api/login
router.post(
  "/login",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password must be minimum 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Check if there is any error with the user input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    try {
      // Get the user credentials from the request body
      const { email, password } = req.body;
      // Check if the user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(401).send("Incorrect email or password");
      }
      // Check if the correct password is entered
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return res.status(401).send("Incorrect email or password");
      }
      // If the correct credentials are entered then provide the user with authentication token
      const userData = {
        id: user._id,
      };
      const token = jwt.sign(userData, "SinmbfLost");

      res.send({ message: `Welcome ${user.username}`, token });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

export default router;
