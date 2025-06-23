import {
  createRegistracija,
  getRegistracijosByUser,
  updateRegistracija,
  deleteRegistracija
} from "../models/registracijaModel.mjs";

// Užsirašyti į knygos rezervaciją
export const newRegistracija = async (req, res) => {
  try {
    // LAIKINAI: naudok fiksuotą user_id, pvz. 1
    const user_id = 1;
    const { book_id, pasirinkta_data } = req.body;
    const registracija = await createRegistracija({ user_id, book_id, pasirinkta_data });
    res.status(201).json({ status: "success", data: { registracija } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "fail", message: error.message });
  }
};

// Gauti visas savo rezervacijas su knygos duomenimis
export const getUserRegistracijos = async (req, res) => {
  try {
    const user_id = 1; // arba req.user.id jei turi autentifikaciją
    const rows = await getRegistracijosByUser(user_id);

    // Sudedam knygos info į book objektą
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

    res.json({ status: "success", data: { registracijos } });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

export const editRegistracija = async (req, res) => {
  try {
    const { komentaras, pasirinkta_data } = req.body;
    if (komentaras && !pasirinkta_data) {
      return res.status(400).json({ status: "fail", message: "Norint siųsti komentarą, privaloma pasirinkti rezervacijos datą." });
    }
    const { id } = req.params;
    await updateRegistracija(id, { komentaras, pasirinkta_data });
    res.json({ status: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "fail", message: error.message });
  }
};

// Ištrinti rezervaciją (atšaukti užsakymą)
export const removeRegistracija = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteRegistracija(id);
    res.json({ status: "success", message: "Rezervacija pašalinta" });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};