import { sql } from "../dbConnection.mjs";

// Sukuria naują knygą
export const postBook = async (bookData) => {
  const allowed = [
    "pavadinimas",
    "kaina",
    "data1",
    "data2",
    "trukme",
    "vertinimas",
    "nuotrauka",
    "aprasymas"
  ];
  const filteredData = {};
  for (const key of allowed) {
    if (bookData[key] !== undefined) {
      filteredData[key] = bookData[key];
    }
  }

  delete filteredData.id;
  
  const columns = Object.keys(filteredData);
  const book = await sql`
    INSERT INTO books ${sql(filteredData, columns)}
    RETURNING *`;
  return book[0];
};

// Gauk visas knygas
export const getBooks = async () => {
  const books = await sql`
    SELECT * FROM books`;
  return books;
};

// Gauk vieną knygą pagal ID
export const getBookById = async (id) => {
  const book = await sql`
    SELECT * FROM books WHERE id = ${id}`;
  return book[0];
};

// Atnaujina knygą pagal ID
export const updateBook = async (id, updatedData) => {
  const allowed = [
    "pavadinimas",
    "kaina",
    "data1",
    "data2",
    "trukme",
    "vertinimas",
    "nuotrauka",
    "aprasymas"
  ];
  const filteredData = {};
  for (const key of allowed) {
    if (updatedData[key] !== undefined) {
      filteredData[key] = updatedData[key];
    }
  }
  const columns = Object.keys(filteredData);
  const updatedBook = await sql`
    UPDATE books SET ${sql(filteredData, columns)}
    WHERE id = ${id}
    RETURNING *`;
  return updatedBook[0];
};

// Ištrina knygą pagal ID
export const deleteBook = async (id) => {
  const deletedBook = await sql`
    DELETE FROM books WHERE id = ${id}
    RETURNING *`;
  return deletedBook[0];
};