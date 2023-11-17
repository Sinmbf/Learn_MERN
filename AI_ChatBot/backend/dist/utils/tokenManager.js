import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constant.js";
// Function to generate a token
export const generateToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};
// Function to verify a token
export const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token) {
        return res.status(401).send("Token not received");
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.jwtData = data;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Token expired");
    }
};
//# sourceMappingURL=tokenManager.js.map