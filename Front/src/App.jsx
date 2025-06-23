import BookForm from "./components/BookForm";
import LoginForm from "./components/LoginForm";
import { useState, useEffect, useContext } from "react";
import { getAllBooks } from "./services/getBook";
import BookList from "./components/BookList";
import { Routes, Route } from "react-router";
import NavBar from "./components/NavBar";
import { UserContext } from "../contexts/userContext";
import ManoBooks from "./components/ManoBooks";

function App() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserContext);

  const fetchBooks = async () => {
    try {
      const booksList = await getAllBooks();
      setBooks(booksList.data.books);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-4 m-5 bg-gray-100 rounded-lg shadow-md">
      <NavBar />
      {loading && <p className="text-center text-gray-500">Kraunama...</p>}

      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <BookList
                books={books}
                setBooks={setBooks}
                user={user}
              />
            }
          />
          <Route path="/mano-knygos" element={<ManoBooks />} />
          <Route
            path="/all-books"
            element={
              <BookList
                books={books}
                setBooks={setBooks}
                user={user}
              />
            }
          />
          <Route path="/login" element={<LoginForm />} />
          {user && user.role === "admin" && (
            <Route
              path="/create-book"
              element={<BookForm onSubmit={fetchBooks} />}
            />
          )}
        </Routes>
      )}
      <footer className="text-center m-4 text-gray-700">
        All rights reserved by Tomas Bendaravičius © 2025
      </footer>
    </div>
  );
}

export default App;