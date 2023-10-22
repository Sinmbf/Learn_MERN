const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ROUTE 1; Create a new user using POST : /api/auth/createuser. No login required.
router.post(
  "/createuser",
  [
    body("name", "Please enter a valid name with minimum 3 characters")
      .isLength({ min: 3 })
      .escape(),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Passwords must be minimum 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors then send bad request and display the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Get the name email and password entered by the user
      const { name, email, password } = req.body;
      // Check if a user with the same email already exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with the email already exists" });
      }
      // Generate a secured password hash along with salt
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);
      // Create a new user
      user = await User.create({
        name,
        email,
        password: secPass,
      });

      // Generate a user authentication token and send it as response
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, "SinmbfLost");
      res.json({ authToken });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
);

// ROUTE 2: Authenticate the user using POST : /api/auth/login. No login required.
router.post(
  "/login",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Passwords must be minimum 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors then send bad request and display the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Get the email and password entered by the user
      const { email, password } = req.body;
      // Check if the credentials entered by the user are correct
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Incorrect email or password" });
      }
      const checkPass = await bcrypt.compare(password, user.password);
      if (!checkPass) {
        return res.status(401).json({ error: "Incorrect email or password" });
      }
      // If correct credentials are entered then send a auth Token as response
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, "SinmbfLost");
      res.json({ authToken });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
