import { client } from "../db.js";

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: string;
}

// INSERT
export async function insertUser(
  username: string,
  email: string,
  password: string,
): Promise<User | null> {
  try {
    const insertQuery = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const result = await client.query(insertQuery, [username, email, password]);
    console.log("Inserted user: ", result.rows[0]);
    return result.rows[0];
  } catch (err: any) {
    if (err.code === "23505") {
      console.error("Error: username or email already exists");
    } else {
      console.error("Unexpected error:", err);
    }
    return null;
  }
}
