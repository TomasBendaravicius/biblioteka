import { sql } from "../dbConnection.mjs";

export const createBookUsers = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS BookUsers (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'user'
    );
  `;

  await sql.end();
};

createBookUsers();