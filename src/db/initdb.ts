// Run this file to initialise a postgreSQL database using the node-pg package (i.e. va JS instead of SQL script).
// ! Do NOT run this file on an existing database or all data will be lost
import "dotenv/config";
import { Pool } from "pg";

export const dropExistingTables = async (databasePool: Pool) => {
  // if (process.env.NODE_ENV !== "development") {
  //   return;
  // }

  console.log("call drop func");

  const db = databasePool;

  console.log("Removing existing tables...");

  try {
    // Saved channels table connects the other tables, and must be dropped first
    console.log("dropping subscriptions table, if it exists...");
    await db.query("DROP TABLE IF EXISTS saved_channels;");

    console.log("dropping channels table, if it exists...");
    await db.query("DROP TABLE IF EXISTS channels;");

    console.log("dropping users table, if it exists...");
    await db.query("DROP TABLE IF EXISTS users;");

    console.log("All existing tables removed");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createNewTables = async (databasePool: Pool) => {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const db = databasePool;

  console.log("Creating new tables...");

  try {
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

    console.log("All new tables created");
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const initialiseDatabase = async (databasePool: Pool) => {
  try {
    await dropExistingTables(databasePool);
    await createNewTables(databasePool);
    console.log("Database initialisation completed successfully");
  } catch (error) {
    console.log("Database initialisation completed with errors");
  }
};
