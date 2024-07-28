import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";

export const signUp = async (req, res, next) => {
  // Get user credentials
  const { username, email, password } = req.body;
  // Encrypt the password
  const hashedPassword = bcryptjs.hashSync(password, 10); // hashSync => await for hash
  // 10 => Salt that will get combined with hash to create encryption
  // Create new user using User model
  const newUser = new User({ username, email, password: hashedPassword });
  // Save user to database
  try {
    await newUser.save(); // wait until saved to database
    res.status(201).json({ message: "User created successfully" }); // 201 => Create something successfully
  } catch (error) {
    next(error); // Use the middleware
  }
};
