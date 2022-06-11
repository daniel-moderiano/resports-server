"use strict";
// * This line is required to avoid a known issue with ts-node that does not recognise manual .env types
/// <reference path="../../environment.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const pg_1 = require("pg");
// Define the db connection pools. These will be used to run queries
// Used purely for testing purposes
// * To ensure the test pool is used for queries, manually set the process.env.TEST_ENV to 'true' in test setup
// * Please enter the personalised details for your test db that is SEPARATE to your production db
const testPool = new pg_1.Pool({
    user: process.env.TEST_DB_USER,
    host: process.env.TEST_DB_HOST,
    database: process.env.TEST_DB_NAME,
    password: process.env.TEST_DB_PASSWORD,
    port: process.env.TEST_DB_PORT
});
// Used in testing for error handling. This is a non existent databse that should cause a connection error
const errorPool = new pg_1.Pool({
    database: 'something that will throw bad connection',
    password: 'this will result in error path',
    port: 3211
});
// Used in development/production.
// This uses a chosen DB with the parameters below. In this case, while running locally, the 'resports' db will be used under a sysadmin superuser
const pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});
// Use this function to get access to the pool for queries. This is crafted as a function to ensure the correct pool is returned based on the TEST_ENV at the time of calling this function
const getDb = () => {
    if (process.env.TEST_ENV === 'true') {
        // Provide access to 'error' database to test error handling in db utility functions
        if (process.env.TEST_ERROR === 'true') {
            return errorPool;
        }
        else {
            return testPool;
        }
    }
    else {
        return pool;
    }
};
exports.default = getDb;
