import jwt from "jsonwebtoken";

export const generateToken = (id: string, email: string, expiresIn: string) => {
  // Get the data provided by the client
  const payload = { id, email };
  // Generate a token
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};
