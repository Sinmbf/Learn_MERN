const JWT_SECRET = "SinmbfLost";
const jwt = require("jsonwebtoken");

const fetchUser = async (req, res, next) => {
  try {
    // Get user authentication token from the request header
    const token = req.header("auth-token");
    // Check if a valid token is provided. If not then send bad request
    if (!token) {
      return res.staus(400).json({ error: "Invalid authentication token" });
    }
    // Verify the authentication token of the user
    const data = jwt.verify(token, JWT_SECRET);
    req.userId = data.user.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = fetchUser;
