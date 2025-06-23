import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllBooks = async () => {
  const response = await axios.get(`${API_URL}/books`, {
    withCredentials: true,
  });
  console.log("API atsakymas:", response.data);
  if (!response.data || !response.data.data || !response.data.data.books || response.data.data.books.length === 0)
    throw new Error("No data found");
  return response.data;
};

export const getOneBook = async (id) => {
  const response = await axios.get(`${API_URL}/books/${id}`, {
    withCredentials: true,
  });
  return response.data;
};