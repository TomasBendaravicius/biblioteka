import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const updateBook = async (id, data) => {
    try {
        const response = await axios.patch(`${API_URL}/books/${id}`, data, {
            withCredentials: true,
        });
        alert(
            `Knyga atnaujinta sėkmingai!\n\nNauji duomenys:\nPavadinimas: ${data.pavadinimas}\nKaina: ${data.kaina}\nData nuo: ${data.data1}\nData iki: ${data.data2}\nTrukmė: ${data.trukme}\nVertinimas: ${data.vertinimas}`
        );
        return response.data;
    } catch (error) {
        console.error("Nepavyko atnaujinti knygos:", error.response?.data || error.message);
        throw error;
    }
};