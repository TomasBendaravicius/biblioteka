import { sql } from "../dbConnection.mjs";

export const BookTables = async () => {
  await sql`
     CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    pavadinimas varchar(255),
    trukme varchar(255),
    kaina varchar(255),
    data1 date,
    data2 date,
    vertinimas varchar(255),
    nuotrauka varchar(255),
    aprasymas text,
    tinkaVaikams boolean DEFAULT false
  );
`;

  await sql.end();
};

BookTables();
