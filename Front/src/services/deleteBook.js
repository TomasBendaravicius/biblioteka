import axios from "axios";
import { getOneBook } from "./getBook";

const API_URL = import.meta.env.VITE_API_URL;

export const deleteBook = async (id) => {
  const response = await getOneBook(id);
  const book = response?.data?.book;
  const { pavadinimas, kaina } = book || {};
  const confirmed = window.confirm(
    `Ar tikrai norite ištrinti knygą "${pavadinimas}" (kaina: ${kaina} €)?`
  );
  if (!confirmed) return;
  const res = await axios.delete(`${API_URL}/books/${id}`, {
    withCredentials: true,
  });
  return res.data;
};