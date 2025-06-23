import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${apiURL}/auth/login`, {
      withCredentials: true,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
