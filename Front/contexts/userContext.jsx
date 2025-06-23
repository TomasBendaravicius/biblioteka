import { createContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3030/api/v1";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/users/me`, {
        withCredentials: true,
      });
      setUser(response.data.data);
    } catch (error) {
      setUser(null);
      console.error(
        error.response?.data?.message || "Failed to fetch user",
        error
      );
    } finally {
      setLoading(false);
    }
  };
  fetchUser();
}, []);

  const logoutUser = async () => {
    try {
      await axios.get(`${API_URL}/users/logout`, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error(
        error.response?.data?.message || "Failed to logout user",
        error
      );
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logoutUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
