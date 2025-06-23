import postgres from "postgres";
import "dotenv/config";

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const sql = postgres(connectionString);

const testConnection = async () => {
  try {
    await sql`SELECT 1`;
    console.log("Database connection successful");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};

export { sql, testConnection };
