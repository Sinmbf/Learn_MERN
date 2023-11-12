import { Request, Response, NextFunction } from "express";
import { ValidationChain, body, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
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
      return res.status(422).json({ errors: errors.array() });
    }
    // If no errors then move on to the next function
    next();
  };
};

export const loginValidator = [
  body("email", "Please enter a valid email").trim().isEmail(),
  body("password", "Passwords must be minimum 6 characters")
    .trim()
    .isLength({ min: 6 }),
];

export const registerValidator = [
  body("name", "Name must be minimum characters").trim().isLength({ min: 3 }),
  ...loginValidator,
];
