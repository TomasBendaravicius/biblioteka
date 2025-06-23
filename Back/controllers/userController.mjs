import { sql } from "../dbConnection.js";

// Sukuria naują vartotoją
export const createUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const result = await sql`
      INSERT INTO BookUsers (username, email, password, role)
      VALUES (${username}, ${email}, ${password}, ${role})
      RETURNING *;
    `;
    res.status(201).json(result[0]);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

// Gauk visus vartotojus
export const getUsers = async (req, res) => {
  try {
    const users = await sql`SELECT * FROM BookUsers;`;
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Gauk vartotoją pagal ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await sql`SELECT * FROM BookUsers WHERE id = ${id};`;
    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Atnaujina vartotojo informaciją
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, role } = req.body;

  try {
    const result = await sql`
      UPDATE BookUsers
      SET 
        username = ${username},
        email = ${email},
        password = ${password},
        role = ${role}
      WHERE id = ${id}
      RETURNING *;
    `;
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Ištrina vartotoją pagal ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sql`DELETE FROM BookUsers WHERE id = ${id} RETURNING *;`;
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};