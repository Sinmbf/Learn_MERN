const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  try {
    // Get user authentication token from the header
    const token = req.header("auth-token");
    // Check if the token is provided
    if (!token) {
      return res.status(404).json({ error: "Invalid authentication token" });
    }
    const data = jwt.verify(token, "SinmbfLost");
    req.userId = data.user.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

module.exports = fetchUser;
