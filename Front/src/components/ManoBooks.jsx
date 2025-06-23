import { useEffect, useState } from "react";
import axios from "axios";

function ManoBooks() {
  const [registracijos, setRegistracijos] = useState([]);
  const [komentarai, setKomentarai] = useState({});
  const [datos, setDatos] = useState({});
  const [successMessages, setSuccessMessages] = useState({});

  // Užkrauk registracijas
  const fetchRegistracijos = async () => {
    const res = await axios.get("http://localhost:3030/api/v1/registracijos", { withCredentials: true });
    setRegistracijos(res.data.data.registracijos);
  };

  useEffect(() => {
    fetchRegistracijos();
  }, []);

  const handleUpdate = async (id) => {
    await axios.patch(
      `http://localhost:3030/api/v1/registracijos/${id}`,
      { pasirinkta_data: datos[id] },
      { withCredentials: true }
    );
    fetchRegistracijos();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3030/api/v1/registracijos/${id}`, { withCredentials: true });
    setRegistracijos(registracijos.filter(r => r.id !== id));
  };

  const handleComment = async (id) => {
    if (!datos[id]) {
      setSuccessMessages(prev => ({
        ...prev,
        [id]: "Norint siųsti komentarą, privaloma pasirinkti pratesimo datą."
      }));
      return;
    }
    try {
      await axios.patch(
        `http://localhost:3030/api/v1/registracijos/${id}`,
        { komentaras: komentarai[id], pasirinkta_data: datos[id] },
        { withCredentials: true }
      );
      setSuccessMessages(prev => ({
        ...prev,
        [id]: "Ačiū už jūsų paliktą komentarą!"
      }));
      fetchRegistracijos();
      setKomentarai(prev => ({ ...prev, [id]: "" }));
    } catch (err) {
      setSuccessMessages(prev => ({
        ...prev,
        [id]: err.response?.data?.message || "Nepavyko išsiųsti komentaro."
      }));
    }
  };

  return (
    <div>
      <h2>Mano knygos</h2>
      {registracijos.length === 0 && <p>Neturite užsiregistravęs į knygų.</p>}
      {registracijos.map(reg => (
        <div key={reg.id} style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}>
          <div><b>Pavadinimas:</b> {reg.book?.pavadinimas}</div>
          <div><b>Aprašymas:</b> {reg.book?.aprasymas}</div>
          <div><b>Kaina:</b> {reg.book?.kaina} Eur</div>
          <div>
            <b>Knyga laisva nuo:</b> {reg.book?.data1 ? new Date(reg.book.data1).toLocaleDateString() : "Nenurodyta"} <br />
            <b>Knyga laisva iki:</b> {reg.book?.data2 ? new Date(reg.book.data2).toLocaleDateString() : "Nenurodyta"} <br />
            <b>Mano rezervacijos data:</b> {reg.pasirinkta_data ? new Date(reg.pasirinkta_data).toLocaleDateString() : "Nepasirinkta"} <br />
            <input
              type="date"
              value={datos[reg.id] ?? reg.pasirinkta_data ?? ""}
              onChange={e => setDatos({ ...datos, [reg.id]: e.target.value })}
            />
            <button onClick={() => handleUpdate(reg.id)}>Pratęsti pasirinkta datą iki</button>
          </div>
          <button onClick={() => handleDelete(reg.id)}>Atšaukti</button>
          {(reg.dalyvauta || (reg.pasirinkta_data && new Date(reg.pasirinkta_data) < new Date())) && (
            <form
              onSubmit={e => {
                e.preventDefault();
                handleComment(reg.id);
              }}
            >
              <input
                name="komentaras"
                placeholder="Jūsų komentaras"
                value={komentarai[reg.id] ?? ""}
                onChange={e => setKomentarai({ ...komentarai, [reg.id]: e.target.value })}
              />
              <button
                type="submit"
                className="px-6 p-2 m-2 text-lg font-bold rounded bg-blue-400 text-white transition-colors duration-200 hover:bg-blue-600 hover:text-white"
              >
                Siųsti komentarą
              </button>
              {/* Pranešimas po komentaro siuntimo */}
              {successMessages[reg.id] && (
                <div className={successMessages[reg.id].startsWith("Ačiū") ? "text-green-600 font-bold my-2" : "text-red-600 font-bold my-2"}>
                  {successMessages[reg.id]}
                </div>
              )}
            </form>
          )}
          {reg.komentaras && <div>Jūsų komentaras: {reg.komentaras}</div>}
        </div>
      ))}
    </div>
  );
}
export default ManoBooks;