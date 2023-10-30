import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER USER
export const register = async (req, res) => {
  try {
    // Get user details from the request body
    const {
      firstName,
      lastName,
      email,
      password,
      imagePath,
      friends,
      location,
      occupation,
    } = req.body;

    // Generate a password hash along with salt
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    // Check if a user with the same email already exists
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res
        .status(401)
        .send("Sorry a user with the same email already exists");
    }
    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      imagePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    // Save the user in the database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN USER
export const login = async (req, res) => {
  try {
    // Get the user email and password from the request body
    const { email, password } = req.body;
    // Find the user by his email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "User does not exist" });
    }
    // Check if the user entered the correct password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(401).json({ message: "Invalid credentials" });
    }
    // Generate a token and provide it to the user if login successful
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
