// ! This line is required to avoid a known issue with ts-node that does not recognise manual .env types
/// <reference path="../../environment.d.ts" />

import 'dotenv/config'
import { Pool } from 'pg';

// Define the db connection pool. This will be used to run queries
// This uses a chosen DB with the parameters below. In this case, while running locally, the 'resports' db will be used under a sysadmin superuser
let db: Pool;

// db = new Pool({
//   database: 'something that will throw bad connection',
//   password: 'this will result in unhappy path',
//   port: 3211
// });

// if (process.env.UNHAPPY === 'true') {
//   db = new Pool({
//     database: 'something that will throw bad connection',
//     password: 'this will result in unhappy path',
//     port: 3211
//   });
// } else {
//   db = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT
//   });
// }

const getDbPool = () => {
  if (process.env.UNHAPPY === 'true') {
    return new Pool({
      database: 'something that will throw bad connection',
      password: 'this will result in unhappy path',
      port: 3211
    });
  } else {
    return new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    });
  }
}


// Use this query property in other files by importing this file as 'db', then performing something like the following:
// await db.query('SELECT * FROM users WHERE id = $1', [12])
export default getDbPool;