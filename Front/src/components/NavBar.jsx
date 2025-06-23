import { NavLink, useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { UserLogout } from "../services/logout";

function NavBar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  // Debug: parodyk user info konsolėje
  console.log("Prisijungęs vartotojas:", user);

  const handleLogout = async () => {
    try {
      await UserLogout();
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="flex gap-4 items-center mb-6">
      <NavLink
        to="/login"
        className="px-6 py-3 text-lg font-bold rounded bg-blue-400 text-white transition-colors duration-200 hover:bg-blue-600 hover:text-white"
      >
        Login
      </NavLink>

      {user && (
        <NavLink
          to="/"
          className="px-6 py-3 text-lg font-bold rounded bg-blue-400 text-white transition-colors duration-200 hover:bg-blue-600 hover:text-white"
        >
          Knygos
        </NavLink>
      )}

      {user && (
        <NavLink
          to="/mano-knygos"
          className="nav-link px-6 py-3 text-lg font-bold rounded bg-blue-400 text-white transition-colors duration-200 hover:bg-blue-600 hover:text-white"
        >
          Rezervuotos knygos
        </NavLink>
      )}
    </nav>
  );
}

export default NavBar;