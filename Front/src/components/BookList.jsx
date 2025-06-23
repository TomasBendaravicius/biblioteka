import React, { useState } from "react";
import axios from "axios";
import Book from "./Book";
import BookForm from "./BookForm";

function BookList({ books, setBooks, user }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [childFilter, setChildFilter] = useState("all");
    const [searchTitle, setSearchTitle] = useState("");
    const [searchDate, setSearchDate] = useState("");

    const handleCreateBook = async (data) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/books`,
                data,
                { withCredentials: true }
            );
            setAlertMsg("Knyga sukurta sėkmingai!");
            setBooks((prev) => [...prev, res.data.data.book]);
            setShowCreateModal(false);
        } catch (error) {
            setAlertMsg("Klaida: knygos sukurti nepavyko!");
        }
    };

    const filteredBooks = books.filter((book) => {
        if (childFilter === "true" && book.tinkaVaikams !== true) return false;
        if (childFilter === "false" && book.tinkaVaikams !== false) return false;
        if (
            searchTitle &&
            !book.pavadinimas.toLowerCase().includes(searchTitle.toLowerCase())
        ) {
            return false;
        }
        if (
            searchDate &&
            !(searchDate >= book.data1 && searchDate <= book.data2)
        ) {
            return false;
        }
        return true;
    });

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Ieškoti pagal pavadinimą"
                    className="p-2 rounded border"
                    value={searchTitle}
                    onChange={e => setSearchTitle(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Ieškoti pagal datą"
                    className="p-2 rounded border"
                    value={searchDate}
                    onChange={e => setSearchDate(e.target.value)}
                />
            </div>

            

            {user?.role === "admin" && (
                <button
                    className="bg-green-500 m-5 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
                    onClick={() => setShowCreateModal(true)}
                >
                    Sukurti naują knygą
                </button>
            )}

            <h2 className="text-4xl font-bold  m-4">Knygų sąrašas</h2>
            {alertMsg && (
                <div className="bg-blue-100 text-blue-800 p-2 rounded mb-2">{alertMsg}</div>
            )}

            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white  p-6 rounded shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-xl"
                            onClick={() => setShowCreateModal(false)}
                        >
                            &times;
                        </button>
                        <BookForm onSubmit={handleCreateBook} />
                    </div>
                </div>
            )}

            {filteredBooks.length === 0 ? (
                <p>Nėra knygų</p>
            ) : (
                filteredBooks.map((book) => (
                    <Book key={book.id} book={book} user={user} />
                ))
            )}
        </div>
    );
}

export default BookList;