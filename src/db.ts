import { Client } from "pg";
import dotenv from "dotenv";

export const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

export async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL");
  } catch (err) {
    console.error("Error:", err);
  }
}

export async function disconnectDB() {
  try {
    await client.end();
    console.log("Disconnected from PostgreSQL");
  } catch (err) {
    console.error("Error:", err);
  }
}
