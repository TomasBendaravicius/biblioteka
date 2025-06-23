import {
  postBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../models/bookModel.mjs";
import { sql } from "../dbConnection.mjs";
import { randomBytes } from "crypto";

// Funkcija, kuri generuoja atsitiktinį 6 simbolių kodą
function randomCode() {
  return randomBytes(3).toString("hex");
}

// Sukuria naują knygą
export const newBook = async (req, res, next) => {
  try {
    const book = req.body;
    const newCode = randomCode();
    const bookWithCode = { kodas: newCode, ...book };

    const createdBook = await postBook(bookWithCode);

    res.status(201).json({
      status: "success",
      data: {
        book: createdBook,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "fail",
      message: "Failed to create book",
    });
  }
};

// Gauk visas knygas
export const getAllBooks = async (req, res, next) => {
  try {
    const books = await getBooks();

    res.status(200).json({
      status: "success",
      results: books.length,
      data: {
        books,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "fail",
      message: "Failed to fetch books",
    });
  }
};

// Gauk vieną knygą pagal ID
export const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await getBookById(id);
    if (!book) {
      return res.status(404).json({
        status: "fail",
        message: "Knyga nerasta",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "fail",
      message: "Failed to fetch book",
    });
  }
};

// Atnaujina knygą pagal ID
export const editBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedBook = await updateBook(id, updatedData);
    if (!updatedBook) {
      return res.status(404).json({
        status: "fail",
        message: "Knyga nerasta",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        book: updatedBook,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "fail",
      message: "Failed to update book",
    });
  }
};

// Ištrina knygą pagal ID
export const removeBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await deleteBook(id);
    if (!deletedBook) {
      return res.status(404).json({
        status: "fail",
        message: "Knyga nerasta",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "fail",
      message: "Failed to delete book",
    });
  }
};

// Pridėti vertinimą konkrečiai knygai
export const pridetiVertinima = async (req, res) => {
  try {
    const book_id = req.params.id;
    const { vertinimas } = req.body;
    if (!vertinimas || vertinimas < 1 || vertinimas > 10) {
      return res.status(400).json({ message: "Vertinimas turi būti tarp 1 ir 10" });
    }
    await sql`
      INSERT INTO book_vertinimas (book_id, vertinimas)
      VALUES (${book_id}, ${vertinimas})
    `;
    res.status(201).json({ message: "Vertinimas išsaugotas" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Nepavyko išsaugoti vertinimo" });
  }
};

// Gauti vidutinį vertinimą konkrečiai knygai
export const gautiVidutiniVertinima = async (req, res) => {
  try {
    const book_id = req.params.id;
    const result = await sql`
      SELECT AVG(vertinimas) AS vidutinisvertinimas
      FROM book_vertinimas
      WHERE book_id = ${book_id}
    `;
    res.json({ vidutinisVertinimas: result[0].vidutinisvertinimas });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Nepavyko gauti vidutinio vertinimo" });
  }
};