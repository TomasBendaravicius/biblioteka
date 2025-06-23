import { sql } from "../dbConnection.mjs";

export const BookVertinimas = async () => {
  await sql`
   CREATE TABLE IF NOT EXISTS book_vertinimas (
  id SERIAL PRIMARY KEY,
  book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
  vertinimas INTEGER NOT NULL CHECK (vertinimas BETWEEN 1 AND 10)
);
  `;

  await sql.end();
};

BookVertinimas();