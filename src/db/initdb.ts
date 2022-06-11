// Run this file to initialise the postgreSQL database with the schema outlined below. 
// ! Do NOT run this file on an existing database or all data will be lost (unless you are working with a test db)
import getDb from ".";
import 'dotenv/config';

export const init = async () => {
  const db = getDb();
  if (process.env.TEST_ENV) {
    console.log('Using test DB');
  } else {
    console.log('Using production DB');
  }

  try {
    // Subscriptions table connects the other tables, and must be dropped first
    console.log("dropping subscriptions table, if exists...");
    await db.query('DROP TABLE IF EXISTS subscriptions;')

    console.log("dropping users table, if exists...");
    await db.query('DROP TABLE IF EXISTS users;')

    console.log("dropping channels table, if exists...");
    await db.query('DROP TABLE IF EXISTS channels;')

    // Authentication with Auth0 - the user_id will be added following user auth with Auth0, which generates a unique ID
    console.log("creating users table...");
    await db.query(`
      CREATE TABLE users (
        user_id TEXT PRIMARY KEY NOT NULL,
        user_email TEXT NOT NULL UNIQUE
      );
    `);

    // Consider additional information e.g. channel logo_url, description, etc.
    console.log("creating channels table...");
    await db.query(`
      CREATE TABLE channels (
        channel_id serial PRIMARY KEY,
        channel_name TEXT
      );
    `);

    // Join table connecting users with channels
    console.log("creating subscriptions table...");
    await db.query(`
      CREATE TABLE subscriptions (
        subscription_id serial PRIMARY KEY,
        user_id TEXT REFERENCES users(user_id),
        channel_id INT REFERENCES channels(channel_id)
      );
    `);

  } catch (err) {
    console.log(err);
    throw err;
  }
};

// ! Call this only when you are positive you want to wipe the database
// (async () => {
//   try {
//     await init();
//     console.log("finished");
//   } catch (error) {
//     console.log("finished with errors");
//   }
// })();