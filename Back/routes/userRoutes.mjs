import express from "express";
import {
  login,
  logout,
  signup,
  protect,
  getAuthenticatedUser,
} from "../controllers/authController.mjs";
import { validateLogin } from "../validators/login.mjs";
import { validate } from "../validators/validate.mjs";

const userRouter = express.Router();

// Registracija (naujo vartotojo sukūrimas)
userRouter.post("/signup", signup);

// Prisijungimas
userRouter.post("/login", validateLogin, validate, login);

// Atsijungimas (tik prisijungusiam vartotojui)
userRouter.post("/logout", protect, logout);

// Gauti prisijungusio vartotojo duomenis (tik prisijungusiam)
userRouter.get("/me", protect, getAuthenticatedUser);

export default userRouter;