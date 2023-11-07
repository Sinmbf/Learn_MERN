import jwt from "jsonwebtoken";
export const generateToken = (id, email, expiresIn) => {
    // Get the data provided by the client
    const payload = { id, email };
    // Generate a token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};
//# sourceMappingURL=tokenManager.js.map