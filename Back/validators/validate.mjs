import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Sukuriamas klaidos pranešimas
      const errorString = errors
        .array()
        .map((error) => error.msg)
        .join("; ");

      // Sukuriamas klaidos objektas su statuso kodu
      const error = new Error(errorString);
      error.statusCode = 400; // Pridedamas statuso kodas
      throw error;
    }

    next(); // Tęsiama į kitą middleware arba kontrolerį, jei validacija praėjo
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode || 500).json({
      status: "fail",
      message: error.message,
    });
  }
};