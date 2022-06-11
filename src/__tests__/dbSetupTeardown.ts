import getDb from '../db'
import { init } from '../db/initdb'

// ! Ensure test DB is used
process.env.TEST_ENV = 'true';

// Ensure all tables are first dropped before re-creating them anew in the test DB
beforeAll(async () => {
  try {
    await init();
  } catch (error) {
    console.log("Error with DB initialisation");
  }
});

// Close the pool on completion
afterAll(async () => {
  await getDb().end();
});