import { sql } from "../dbConnection.mjs";

export const rezerv = async () => {
  await sql`
    CREATE TABLE rezerv (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES BookUsers(id),
      buking_id INTEGER REFERENCES books(id),
      pasirinkta_data DATE,
      komentaras TEXT,
      tinkaVaikams BOOLEAN DEFAULT FALSE
    );
  `;

  await sql.end();
};

rezerv();

//paleidimo kodas
//node tables/rezervTables.mjs