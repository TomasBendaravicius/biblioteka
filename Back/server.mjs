import app from "./app.mjs";
import "dotenv/config";
import { sql, testConnection } from "./dbConnection.mjs";

const port = process.env.PORT || 3000;

// Tvarkome uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception! Shutting down...");
  console.error(err);
  process.exit(1);
});

(async () => {
  try {
    // Testuojame duomenų bazės ryšį
    await testConnection();
    console.log("Database connection successful!");

    // Paleidžiame serverį
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }

  // Tvarkome neapdorotas pažadų klaidas
  process.on("unhandledRejection", async (reason) => {
    console.error("Unhandled rejection! Shutting down...");
    console.error(reason);
    await sql.end();
    process.exit(1);
  });

  // Tvarkome SIGTERM signalą
  process.on("SIGTERM", async () => {
    console.log("SIGTERM received. Shutting down gracefully...");
    await sql.end();
    process.exit(0);
  });
})();