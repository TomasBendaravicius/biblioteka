import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

export const signUp = async (data) => {
  const response = await axios.post(`${apiURL}/signUp`, data);
  return response.data;
};
