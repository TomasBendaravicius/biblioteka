import express from "express";
import bookRouter from "./routes/bookRoutes.mjs";
import userRouter from "./routes/userRoutes.mjs";
import cors from "cors";
import cookieParser from "cookie-parser";
import AppError from "./utils/appError.mjs";
import registracijosRouter from "./routes/registracijos.mjs";

// Sukuriame serverį
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// Middleware kuris išparsina body
app.use(express.json());

// Knygų rezervacijų maršrutai
app.use("/api/v1/registracijos", registracijosRouter);

// Cookie parser
app.use(cookieParser());

// Knygų maršrutai
app.use("/api/v1/books", bookRouter);

// Vartotojų maršrutai
app.use("/api/v1/users", userRouter);

// Klaidos tvarkymas
app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  console.error("Unexpected error:", err);
  res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
});

export default app;