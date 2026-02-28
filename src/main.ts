import { connectDB, disconnectDB } from "./db.js";
import { createUsersTable } from "./migrations/create_users_table.js";
import { insertUser } from "./users/users.model.js";

async function main() {
  try {
    // Connect to database
    await connectDB();

    // Create the table if it doesn’t exist
    await createUsersTable();

    // Insert users
    const user1 = await insertUser("John", "john@gmail.com", "12345678");
    const user2 = await insertUser("Casey", "casey@gmail.com", "12345678");
    const user3 = await insertUser("Nick", "nick@gmai.com", "12345678");

    console.log("Inserted users:", [user1, user2, user3]);
  } catch (err) {
    console.error("Error in main:", err);
  } finally {
    // Disconnect from database
    await disconnectDB();
  }
}
