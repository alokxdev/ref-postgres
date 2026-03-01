import { connectDB, disconnectDB } from "./db.js";
import { createUsersTable } from "./migrations/create_users_table.js";
import {
  insertUser,
  getUser,
  updateUser,
  deleteUser,
} from "./users/users.model.js";

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

    // Find users
    const user = await getUser("alokforreal@gmail.com");
    if (user) {
      console.log("Found user:", user);
    } else {
      console.log("No user found");
    }

    // Update user
    const updatedUser = await updateUser(1, {
      email: "aloksaidhello@gmail.com",
    });
    if (updatedUser) {
      console.log("User updated successfully:", updatedUser);
    } else {
      console.log("Update failed: User not found or invalid data.");
    }

    // Delete user
    const deletedUser = await deleteUser(2);

    if (deletedUser) {
      console.log(
        `Successfully purged ${deletedUser.username} from the system.`,
      );
    } else {
      console.log("Delete failed: User didn't exist.");
    }
  } catch (err) {
    console.error("Error in main:", err);
  } finally {
    // Disconnect from database
    await disconnectDB();
  }
}
