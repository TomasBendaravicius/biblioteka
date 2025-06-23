import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const postBook = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/books`, data, {
      withCredentials: true,
    });
    alert("Knyga sukurta sėkmingai!");
    return response.data;
  } catch (error) {
    if (error.response) {
      alert(`Klaida: knygos sukurti nepavyko! Kodas: ${error.response.status}`);
      throw error.response;
    } else {
      alert("Klaida: knygos sukurti nepavyko!");
      throw error;
    }
  }
};