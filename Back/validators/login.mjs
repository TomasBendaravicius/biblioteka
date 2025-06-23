import { body } from "express-validator";
import { getUserByEmail } from "../models/userModel.mjs";
import argon2 from "argon2";

export const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid")
    .normalizeEmail({
      gmail_remove_dots: false,
      gmail_remove_subaddress: false,
      gmail_convert_googlemaildotcom: false,
    }) // Sanitize email address
    .custom(async (value) => {
      const user = await getUserByEmail(value);
      if (!user) {
        throw new Error("User not found, please sign up");
      }
      return true; // validation passed
    }),

  body("password")
    .notEmpty()
    .withMessage("Pass is required")
    .custom(async (value, { req }) => {
      const user = await getUserByEmail(req.body.email);

      if (user) {
        const matchPass = await argon2.verify(user.password, value);
        if (!matchPass) {
          throw new Error("Password is incorrect");
        }
        return true;
      }
    }),
];
