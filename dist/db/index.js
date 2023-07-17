"use strict";
// * This line is required to avoid a known issue with ts-node that does not recognise manual .env types
/// <reference path="../../environment.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductionDatabase = exports.getDevelopmentDatabase = exports.getBrokenDatabase = exports.getTestDatabase = void 0;
require("dotenv/config");
const pg_1 = require("pg");
// Define the db connection pools. These will be used to run queries
const getTestDatabase = () => {
    const testPool = new pg_1.Pool({
        connectionString: process.env.DATABASE_URL,
    });
    return testPool;
};
exports.getTestDatabase = getTestDatabase;
const getBrokenDatabase = () => {
    // Used in testing for error handling. This is a non existent databse that will cause a connection error
    const errorPool = new pg_1.Pool({
        database: "something that will throw bad connection",
        password: "this will result in error path",
        port: 3211,
    });
    return errorPool;
};
exports.getBrokenDatabase = getBrokenDatabase;
const getDevelopmentDatabase = () => {
    // An AWS RDS Postgres instance for development purposes only. Do not use in production.
    const developmentPool = new pg_1.Pool({
        user: process.env.DEV_DB_USER,
        host: process.env.DEV_DB_HOST,
        password: process.env.DEV_DB_PASSWORD,
        port: process.env.DEV_DB_PORT,
        database: "postgres",
    });
    return developmentPool;
};
exports.getDevelopmentDatabase = getDevelopmentDatabase;
const getProductionDatabase = () => {
    // AWS RDS Postgres instance for production. Do not use this in testing or development.
    // ? I expect this to be replaced with a more direct Lambda AWS SDK call later
    const productionPool = new pg_1.Pool({
        user: process.env.PROD_DB_USER,
        host: process.env.PROD_DB_HOST,
        password: process.env.PROD_DB_PASSWORD,
        port: process.env.PROD_DB_PORT,
        database: "postgres",
    });
    return productionPool;
};
exports.getProductionDatabase = getProductionDatabase;
