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

// GET
export async function getUser(identifier: string): Promise<User | null> {
  try {
    const selectQuery = `
    SELECT * FROM users
    WHERE username = $1 OR email = $1
    LIMIT 1;
    `;

    const result = await client.query(selectQuery, [identifier]);

    if (result.rows.length === 0) {
      console.log("User not found: ", identifier);
    }

    return result.rows[0];
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
}

// UPDATE
export async function updateUser(
  id: number,
  fields: Partial<{ username: string; email: string; password: string }>,
): Promise<User | null> {
  try {
    const setClauses: string[] = [];
    const values: any[] = [];
    let i = 1;

    for (const key in fields) {
      setClauses.push(`${key} = $${i}`);
      values.push((fields as any)[key]);
      i++;
    }

    if (values.length === 0) return null;

    values.push(id);
    const updateQuery = `
      UPDATE users
      SET ${setClauses.join(", ")}
      WHERE id = $${i}
      RETURNING *;
    `;

    const result = await client.query(updateQuery, values);
    if (result.rows.length === 0) return null;

    console.log("Updated user:", result.rows[0]);
    return result.rows[0];
  } catch (err: any) {
    console.error("Error updating user:", err);
    return null;
  }
}

// DELETE
export async function deleteUser(id: number): Promise<User | null> {
  try {
    const deleteQuery = `DELETE FROM users WHERE id = $1 RETURNING *;`;
    const result = await client.query(deleteQuery, [id]);

    if (result.rows.length === 0) {
      return null; // No user was found to delete
    }

    // Now we actually RETURN the data we fetched!
    return result.rows[0];
  } catch (err: any) {
    console.error("Error deleting user:", err);
    return null;
  }
}
