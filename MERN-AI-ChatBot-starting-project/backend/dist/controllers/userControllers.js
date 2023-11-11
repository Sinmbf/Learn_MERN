import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/tokenManager.js";
import { COOKIE_NAME } from "../utils/constant.js";
// Controller function to get all the users from the database
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "Ok", users });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error", cause: error.message });
    }
};
// Controller function to register a user
export const registerUser = async (req, res, next) => {
    try {
        // Get the user details from the request body
        const { name, email, password } = req.body;
        // Check if a user with the same email already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(401).send("User already exists");
        }
        // Generate a password hash along with salt
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();
        // Create token and store it as cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        const token = generateToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        // Set the token as cookie
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res
            .status(201)
            .json({ message: "Ok", email: user.email, name: user.name });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error", cause: error.message });
    }
};
// Controller function to login a user
export const loginUser = async (req, res, next) => {
    try {
        // Get the user details from the request body
        const { email, password } = req.body;
        // Check if the user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not registered");
        }
        // Verify password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect password");
        }
        // If the user logins again then clear previous cookie to add a new one
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        // If valid credentials are entered then generate a token and store it as cookie
        const token = generateToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        // Set the token as cookie
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res
            .status(200)
            .json({ message: "Ok", email: user.email, name: user.name });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error", cause: error.message });
    }
};
// Controller function to verify a user
export const verifyUser = async (req, res, next) => {
    try {
        // Check if the user exists
        let user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or invalid token");
        }
        // Check if the id is same
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        // If verification successful then send the user details
        return res
            .status(200)
            .json({ message: "Ok", email: user.email, name: user.name });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error", cause: error.message });
    }
};
// Controller function to logout a user
export const userLogout = async (req, res, next) => {
    try {
        // Check if the user exists
        let user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or invalid token");
        }
        // Check if the id is same
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        // If verification successful then clear the cookies of the user
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        return res.status(200).json({ message: "Ok" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error", cause: error.message });
    }
};
//# sourceMappingURL=userControllers.js.map