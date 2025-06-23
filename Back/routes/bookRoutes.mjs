import express from "express";
import {
  newBook,
  getAllBooks,
  getBook,
  editBook,
  removeBook,
  pridetiVertinima,
  gautiVidutiniVertinima,
} from "../controllers/BookController.mjs";
import { allowAccessTo, protect } from "../controllers/authController.mjs";
import { validateNewBook } from "../validators/newBook.mjs";
import { validate } from "../validators/validate.mjs";

const bookRouter = express.Router();

// Knygų sąrašas ir kūrimas
bookRouter
  .route("/")
  .post(validateNewBook, validate, newBook)
  .get(getAllBooks);

// Vienos knygos gavimas, atnaujinimas, trynimas
bookRouter
  .route("/:id")
  .get(getBook)
  .patch(editBook)
  .delete(removeBook);

// Pridėti vertinimą konkrečiai knygai
bookRouter.post("/:id/vertinimas", pridetiVertinima);

// Gauti vidutinį vertinimą konkrečiai knygai
bookRouter.get("/:id/vidutinis-vertinimas", gautiVidutiniVertinima);

export default bookRouter;