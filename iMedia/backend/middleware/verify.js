import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    // Get the authentication token from the request header
    const token = req.header("auth-token");
    if (!token) {
      return res.status(403).send("Access Denied");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    // Verify the token
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifiedToken;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
