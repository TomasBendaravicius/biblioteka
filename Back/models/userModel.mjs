import { sql } from "../dbConnection.mjs";

export const createUser = async (newUser) => {
  const { email, password, username, role = "user" } = newUser;
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("User with this email already exists.");
  }
  const [user] = await sql`
    INSERT INTO BookUsers
    (username, email, password, role)
    VALUES 
    (${username}, ${email}, ${password}, ${role})
    RETURNING *
  `;
  return user;
};

export const getUserByEmail = async (email) => {
  try {
    const [user] = await sql`
      SELECT * FROM BookUsers
      WHERE email = ${email}
    `;
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Failed to fetch user by email.");
  }
};

export const getUserById = async (id) => {
  try {
    const [user] = await sql`
      SELECT id, email, role, username FROM BookUsers
      WHERE id = ${id}
    `;
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to fetch user by ID.");
  }
};