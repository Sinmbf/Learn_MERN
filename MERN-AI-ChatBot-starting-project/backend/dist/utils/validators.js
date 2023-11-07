import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            // Run the validation chain
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        // Check if there are any errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() }); // Unprocessable entity
        }
        // No errors then move on to the next function
        next();
    };
};
export const loginValidator = [
    body("email", "Please enter a valid email").trim().isEmail(),
    body("password", "Password must be minimum 6 characters").trim().isLength({
        min: 6,
    }),
];
export const registerValidator = [
    body("name", "Name must be minimum 3 characters").isLength({ min: 3 }),
    ...loginValidator,
];
//# sourceMappingURL=validators.js.map