import { sql } from "../dbConnection.mjs";

// Sukurti naują rezervaciją
export const createRegistracija = async ({ user_id, book_id, pasirinkta_data }) => {
  const [registracija] = await sql`
    INSERT INTO rezerv (user_id, buking_id, pasirinkta_data)
    VALUES (${user_id}, ${book_id}, ${pasirinkta_data})
    RETURNING *`;
  return registracija;
};

// Gauti visas rezervacijas
export const getVisosRegistracijos = async () => {
  return await sql`
    SELECT * FROM rezerv
  `;
};

// Gauti rezervacijas pagal vartotoją
export const getRegistracijosByUser = async (user_id) => {
  return await sql`
    SELECT r.*, b.pavadinimas, b.data1, b.data2, b.kaina, b.aprasymas
    FROM rezerv r
    JOIN books b ON r.buking_id = b.id
    WHERE r.user_id = ${user_id}
  `;
};

// Atnaujinti rezervaciją
export const updateRegistracija = async (id, { komentaras, pasirinkta_data }) => {
  return await sql`
    UPDATE rezerv
    SET komentaras = ${komentaras}, pasirinkta_data = ${pasirinkta_data}
    WHERE id = ${id}
  `;
};

// Ištrinti rezervaciją
export const deleteRegistracija = async (id) => {
  await sql`DELETE FROM rezerv WHERE id = ${id}`;
};

// Gauti rezervacijas (naudojama su Express)
export const getRegistracijos = async (req, res) => {
  const rows = await sql`
    SELECT r.*, 
           b.pavadinimas, b.aprasymas, b.kaina, b.data1, b.data2
    FROM rezerv r
    JOIN books b ON r.buking_id = b.id
    WHERE r.user_id = ${req.user.id}
  `;

  const registracijos = rows.map(r => {
    const { pavadinimas, aprasymas, kaina, data1, data2, ...rest } = r;
    return {
      ...rest,
      book: {
        pavadinimas,
        aprasymas,
        kaina,
        data1,
        data2,
      }
    };
  });

  res.status(200).json({
    status: "success",
    data: { registracijos },
  });
};