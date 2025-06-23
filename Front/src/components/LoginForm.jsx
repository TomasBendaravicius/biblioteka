import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [mode, setMode] = useState("login"); // login arba register
  const { user, setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (mode === "login") {
        // Prisijungimo užklausa
        const response = await axios.post(`${API_URL}/users/login`, data, {
          withCredentials: true,
        });
        if (response && response.data) {
          // Dažniausiai backend grąžina { status, data: { user } }
          const userData = response.data.data?.user || response.data.data || response.data;
          setUser(userData);
          setMessage("Sėkmingai prisijungėte!");
          navigate("/all-books");
        } else {
          throw new Error("Invalid login response");
        }
      } else {
        // Registracijos užklausa
        const response = await axios.post(`${API_URL}/users/signup`, data, {
          withCredentials: true,
        });
        if (response && response.data) {
          setMessage("Vartotojas sukurtas sėkmingai!");
        } else {
          throw new Error("Invalid signup response");
        }
      }
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Įvyko klaida. Bandykite dar kartą.");
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/users/logout`, {}, { withCredentials: true });
      setUser(null);
      setMessage("Sėkmingai atsijungėte!");
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      setMessage("Atsijungimo klaida. Bandykite dar kartą.");
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
    setMessage("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 rounded-xl shadow-md">
      {user ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Sveiki, {user.email}!</h2>
          <p>Jūs esate prisijungęs.</p>
          <p className="mt-2">Rolė: <span className="font-semibold">{user.role}</span></p>
          <button
            onClick={logout}
            className="btn btn-secondary mt-4 cursor-pointer "
          >
            Atsijungti
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Email */}
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text">El. paštas:</span>
            </label>
            <input
              type="email"
              {...register("email", { required: "El. paštas yra privalomas" })}
              className="input input-bordered"
              placeholder="mail@site.com"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          {/* Username (tik registracijos režime) */}
          {mode === "register" && (
            <div className="form-control">
              <label htmlFor="username" className="label">
                <span className="label-text">Vartotojo vardas:</span>
              </label>
              <input
                type="text"
                {...register("username", { required: "Vartotojo vardas yra privalomas" })}
                className="input input-bordered"
                placeholder="Vartotojo vardas"
              />
              {errors.username && (
                <span className="text-red-500">{errors.username.message}</span>
              )}
            </div>
          )}

          {/* Password */}
          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text">Slaptažodis:</span>
            </label>
            <input
              type="password"
              {...register("password", { required: "Slaptažodis yra privalomas" })}
              className="input input-bordered"
              placeholder="Slaptažodis"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          {/* Password Confirmation (tik registracijos režime) */}
          {mode === "register" && (
            <div className="form-control">
              <label htmlFor="passwordConfirm" className="label">
                <span className="label-text">Pakartokite slaptažodį:</span>
              </label>
              <input
                type="password"
                {...register("passwordConfirm", {
                  required: "Pakartoti slaptažodį yra privaloma",
                })}
                className="input input-bordered"
                placeholder="Pakartokite slaptažodį"
              />
              {errors.passwordConfirm && (
                <span className="text-red-500">{errors.passwordConfirm.message}</span>
              )}
            </div>
          )}

          <button type="submit" className="btn btn-primary mt-4 cursor-pointer">
            {mode === "login" ? "Prisijungti" : "Registruotis"}
          </button>

          <div className="text-center text-sm mt-2">
            {mode === "login" ? (
              <p>
                Neturite paskyros?{" "}
                <button
                  type="button"
                  className="link link-primary font-bold cursor-pointer"
                  onClick={toggleMode}
                >
                  Registruotis
                </button>
              </p>
            ) : (
              <p>
                Jau turite paskyrą?{" "}
                <button
                  type="button"
                  className="link link-primary font-bold cursor-pointer"
                  onClick={toggleMode}
                >
                  Prisijungti
                </button>
              </p>
            )}
          </div>
        </form>
      )}

      {message && (
        <div className="mt-4 text-center text-sm text-green-600 font-bold">
          {message}
        </div>
      )}
    </div>
  );
};

export default LoginForm;