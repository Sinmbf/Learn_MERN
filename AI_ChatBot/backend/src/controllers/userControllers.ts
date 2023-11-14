import { Request, Response, request } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/tokenManager.js";

// Controller function to get all the users
export const getUser = async (req: Request, res: Response) => {
  try {
    // Get all the users from the database
    const user = await User.find();
    return res.status(200).json({ message: "Ok", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error", reason: error.message });
  }
};

// Controller function to register a user
export const registerUser = async (req: Request, res: Response) => {
  try {
    // Get the user information from the request body
    const { name, email, password } = req.body;
    // Check if a user with the same email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(401)
        .send("Sorry a user with the same email already exists");
    }
    // Generate a secure password hash along with salt
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    // If user doesn't exist then create a new one
    user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.clearCookie(process.env.COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      secure: true,
      sameSite: "none",
      signed: true,
    });
    // Generate a token and set it as cookie
    const token = generateToken(user.email, user._id.toString(), "7d");
    if (!token) {
      return res.status(500).send("Failed to generate token");
    }
    // Set the expiry date of cookie
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(process.env.COOKIE_NAME, token, {
      httpOnly: true,
      path: "/",
      secure: true,
      domain: "localhost",
      sameSite: "none",
      signed: true,
      expires,
    });
    return res
      .status(201)
      .json({ message: "Ok", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error", reason: error.message });
  }
};
// Controller function to login a user
export const loginUser = async (req: Request, res: Response) => {
  try {
    // Get the user information from the request body
    const { email, password } = req.body;
    // Check if a user with the same email already exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Account not registered");
    }
    // Check if the correct password is entered
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).send("Invalid credentials");
    }
    // If the user logins again then clear the previous cookie and set a new one
    res.clearCookie(process.env.COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      secure: true,
      sameSite: "none",
      signed: true,
    });
    // Generate a token and set it as cookie
    const token = generateToken(user.email, user._id.toString(), "7d");
    if (!token) {
      return res.status(500).send("Failed to generate token");
    }
    // Set the expiry date of cookie
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    // Set the token as cookie
    res.cookie(process.env.COOKIE_NAME, token, {
      httpOnly: true,
      path: "/",
      secure: true,
      domain: "localhost",
      sameSite: "none",
      signed: true,
      expires,
    });
    return res
      .status(200)
      .json({ message: "Ok", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error", reason: error.message });
  }
};
