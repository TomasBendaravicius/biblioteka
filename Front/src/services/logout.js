import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

export const UserLogout = async () => {
  try {
    const response = await axios.get(`${apiURL}/logout`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};



