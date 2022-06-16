// * Unfortunately, despite this setup and teardown, running different test suites in succession completely fails. Running them individually is recommended when working on specific files until this is fixed

import getDb from '../db'
import { dropTable } from '../db/generalHelpers';
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