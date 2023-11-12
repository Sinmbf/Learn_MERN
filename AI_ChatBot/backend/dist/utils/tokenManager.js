import jwt from "jsonwebtoken";
export const generateToken = async (email, id, expiresIn) => {
    try {
        const token = jwt.sign({ email, id }, process.env.JWT_SECRET, {
            expiresIn,
        });
        return token;
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=tokenManager.js.map