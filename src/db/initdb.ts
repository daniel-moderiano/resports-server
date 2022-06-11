// Run this file to initialise the postgreSQL database with the schema outlined below. 
// ! Do NOT run this file on an existing database or all data will be lost (unless this is what you are after)
import getDb from ".";
import 'dotenv/config';

export const init = async () => {
  const db = getDb();

  try {
    console.log("dropping users table, if exists...");
    await db.query('DROP TABLE IF EXISTS users;')

    console.log("dropping channels table, if exists...");
    await db.query('DROP TABLE IF EXISTS channels;')

    console.log("dropping subscriptions table, if exists...");
    await db.query('DROP TABLE IF EXISTS subscriptions;')

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

    await db.end();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

init().then(() => {
  console.log("finished");
}).catch(() => {
  console.log("finished with errors");
});