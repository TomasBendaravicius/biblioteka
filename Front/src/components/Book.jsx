import { useState } from "react";
import BookForm from "./BookForm";
import { updateBook } from "../services/updateBook";
import { postBook } from "../services/postBook";
import { deleteBook } from "../services/deleteBook";
import axios from "axios";

function Book({ book, onDelete, onUpdate, onCreate, user }) {
  const { id, pavadinimas, kaina, data1, data2, trukme, vertinimas, tinkaVaikams } = book || {};
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [avgRating, setAvgRating] = useState(vertinimas);

  const generateBookCode = () => {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 1000);
    return `BOOK-${timestamp}-${randomSuffix}`;
  };

  const handleUpdate = async (updatedBook) => {
    try {
      const updatedData = await updateBook(id, updatedBook);
      onUpdate && onUpdate(id, updatedData);
      setShowEditForm(false);
    } catch (error) {}
  };

  const handleCreate = async (newBook) => {
    try {
      const bookWithCode = {
        ...newBook,
        kodas: generateBookCode(),
      };
      const createdBook = await postBook(bookWithCode);
      onCreate && onCreate(createdBook);
      setShowCreateForm(false);
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      onDelete && onDelete(id);
    } catch (error) {}
  };

  const getVertinimasColor = (vertinimas) => {
    if (!vertinimas) return "bg-gray-200 text-gray-800";
    if (Number(vertinimas) >= 8) return "bg-green-200 text-green-800";
    if (Number(vertinimas) >= 5) return "bg-yellow-200 text-yellow-800";
    return "bg-red-200 text-red-800";
  };

  const handleRatingSubmit = async () => {
    try {
      await axios.post("http://localhost:3030/api/v1/books/" + id + "/vertinimas", { vertinimas: userRating }, { withCredentials: true });
      const res = await axios.get("http://localhost:3030/api/v1/books/" + id + "/vidutinis-vertinimas", { withCredentials: true });
      setAvgRating(res.data.vidutinisVertinimas);
    } catch (err) {}
  };

  const handleRegister = async (bookId) => {
    try {
      await axios.post(
        "http://localhost:3030/api/v1/registracijos",
        {
          book_id: bookId,
          pasirinkta_data: book.data1
        },
        { withCredentials: true }
      );
      alert("Sėkmingai rezervavote knygą!");
    } catch (error) {
      alert("Nepavyko rezervuoti knygos: " + error.message);
    }
  };

  return (
    <div className="book-card">
      {book ? (
        <>
          <div className="book-details flex flex-col md:flex-row gap-4">
            {book.nuotrauka && (
              <img
                src={book.nuotrauka}
                alt={book.pavadinimas}
                className="w-full md:w-60 h-60 object-cover rounded shadow"
                style={{ maxWidth: "240px" }}
              />
            )}
            <div className="flex-1 flex flex-col gap-2">
              <h3 className="text-2xl font-bold">{pavadinimas}</h3>
              {book.aprasymas && (
                <p className="text-base text-gray-700 mb-2">{book.aprasymas}</p>
              )}
              <p className="text-sm">Knyga laisva nuo: {data1}</p>
              <p className="text-sm">Knyga laisva iki: {data2}</p>
              <p className="text-sm">Kaina: {kaina} Eur už vieną parą</p>
              <p className="text-sm">Maksimali knygos nuomos trukmė: {trukme} dienos</p>
              <p className="text-sm">
                Vidutinis vertinimas:
                <span className="ml-2">
                  {avgRating ? Number(avgRating).toFixed(2) : "Nėra"}
                </span>
              </p>
              
              <div>
                <label>Jūsų vertinimas: </label>
                <select value={userRating} onChange={e => setUserRating(Number(e.target.value))}>
                  <option value={0}> Pasirinkite</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <button
                  className="ml-2 btn"
                  onClick={handleRatingSubmit}
                  disabled={userRating < 1}
                >
                  Siųsti jūsų vertinimą
                </button>
              </div>
              {user && user.role === "user" && (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleRegister(book.id)}
                >
                  Rezervuoti
                </button>
              )}
            </div>
          </div>
          {user && user.role === "admin" && (
            <div className="book-actions flex gap-2 mt-4">
              <button
                className="bg-blue-200 hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 rounded cursor-pointer"
                onClick={() => setShowEditForm(!showEditForm)}
              >
                {showEditForm ? "Atšaukti" : "Redaguoti"}
              </button>
              <button
                className="bg-red-200 hover:bg-red-700 text-black hover:text-white font-bold py-2 px-4 rounded cursor-pointer"
                onClick={() => handleDelete(id)}
              >
                Ištrinti
              </button>
            </div>
          )}
          {showEditForm && (
            <BookForm book={book} onSubmit={handleUpdate} />
          )}
        </>
      ) : (
        <>
          <button
            className="bg-green-200 hover:bg-green-700 text-black hover:text-white font-bold py-2 px-4 rounded cursor-pointer"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            {showCreateForm ? "Atšaukti" : "Sukurti knygą"}
          </button>
          {showCreateForm && <BookForm onSubmit={handleCreate} />}
        </>
      )}
    </div>
  );
}
export default Book;