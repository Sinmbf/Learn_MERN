import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constant.js";
export const generateToken = (id, email, expiresIn) => {
    // Get the data provided by the client
    const payload = { id, email };
    // Generate a token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};
export const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Token not received " });
    }
    // Verify token
    return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message);
                return res.status(401).json({ message: "Token Expired" });
            }
            console.log("Token Verification Successful");
            resolve();
            res.locals.jwtData = success;
            return next();
        });
    });
};
//# sourceMappingURL=tokenManager.js.map