// ! This line is required to avoid a known issue with ts-node that does not recognise manual .env types
/// <reference path="../../environment.d.ts" />

import 'dotenv/config'
import { Pool } from 'pg';

// Define the db connection pools. These will be used to run queries

// Used purely for testing purposes
// ! To ensure the test pool is used for queries, manually set the process.env.TEST_ENV to 'true' in test setup
const testPool = new Pool({
  database: 'something that will throw bad connection',
  password: 'this will result in unhappy path',
  port: 3211
});

// Used in development/production.
// This uses a chosen DB with the parameters below. In this case, while running locally, the 'resports' db will be used under a sysadmin superuser
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

// Use this function to get access to the pool for queries. This is crafted as a function to ensure the correct pool is returned based on the TEST_ENV at the time of calling this function
const getDb = () => {
  if (process.env.TEST_ENV === 'true') {
    return testPool;
  } else {
    return pool;
  }
}

export default getDb;