// * This line is required to avoid a known issue with ts-node that does not recognise manual .env types
/// <reference path="../../environment.d.ts" />

import "dotenv/config";
import { Pool } from "pg";

// Define the db connection pools. These will be used to run queries

export const getTestDatabase = () => {
  const testPool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  return testPool;
};

export const getBrokenDatabase = () => {
  // Used in testing for error handling. This is a non existent databse that will cause a connection error
  const errorPool = new Pool({
    database: "something that will throw bad connection",
    password: "this will result in error path",
    port: 3211,
  });

  return errorPool;
};

export const getDevelopmentDatabase = () => {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  // An AWS RDS Postgres instance for development purposes only. Do not use in production.
  const developmentPool = new Pool({
    user: process.env.DEV_DB_USER,
    host: process.env.DEV_DB_HOST,
    password: process.env.DEV_DB_PASSWORD,
    port: process.env.DEV_DB_PORT,
    database: "postgres",
  });

  return developmentPool;
};

export const getProductionDatabase = () => {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  // AWS RDS Postgres instance for production. Do not use this in testing or development.
  // ? I expect this to be replaced with a more direct Lambda AWS SDK call later
  const productionPool = new Pool({
    user: process.env.PROD_DB_USER,
    host: process.env.PROD_DB_HOST,
    password: process.env.PROD_DB_PASSWORD,
    port: process.env.PROD_DB_PORT,
    database: "postgres",
  });

  return productionPool;
};
