// Run this file to initialise a postgreSQL database using the node-pg package (i.e. va JS instead of SQL script).
// ! Do NOT run this file on an existing database or all data will be lost
import getDb from ".";
import "dotenv/config";

export const init = async () => {
  // ! Do not ever run this in a production environment
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const db = getDb();

  try {
    // Saved channels table connects the other tables, and must be dropped first
    console.log("dropping subscriptions table, if it exists...");
    await db.query("DROP TABLE IF EXISTS saved_channels;");

    console.log("dropping channels table, if it exists...");
    await db.query("DROP TABLE IF EXISTS channels;");

    console.log("dropping users table, if it exists...");
    await db.query("DROP TABLE IF EXISTS users;");

    console.log("creating channels table...");
    await db.query(`
      CREATE TABLE IF NOT EXISTS channels (
        channel_id TEXT NOT NULL PRIMARY KEY,
        platform TEXT NOT NULL
      );
    `);

    console.log("creating users table...");
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        username TEXT UNIQUE NOT NULL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        created_on TIMESTAMP NOT NULL
      );
    `);

    console.log("creating saved_channels table...");
    await db.query(`
      CREATE TABLE IF NOT EXISTS saved_channels (
        username TEXT NOT NULL,
        channel_id TEXT NOT NULL,
        PRIMARY KEY (username, channel_id),
        FOREIGN KEY (username)
          REFERENCES users (username),
        FOREIGN KEY (channel_id)
          REFERENCES channels (channel_id)
      );
    `);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// !Call this only when you are positive you want to wipe the database and start fresh
(async () => {
  try {
    await init();
    console.log("finished");
  } catch (error) {
    console.log("finished with errors");
  }
})();
