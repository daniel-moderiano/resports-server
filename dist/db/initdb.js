"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialiseDatabase = exports.createNewTables = exports.dropExistingTables = void 0;
// Run this file to initialise a postgreSQL database using the node-pg package (i.e. va JS instead of SQL script).
// ! Do NOT run this file on an existing database or all data will be lost
require("dotenv/config");
const dropExistingTables = (databasePool) => __awaiter(void 0, void 0, void 0, function* () {
    // if (process.env.NODE_ENV !== "development") {
    //   return;
    // }
    console.log("call drop func");
    const db = databasePool;
    console.log("Removing existing tables...");
    try {
        // Saved channels table connects the other tables, and must be dropped first
        console.log("dropping subscriptions table, if it exists...");
        yield db.query("DROP TABLE IF EXISTS saved_channels;");
        console.log("dropping channels table, if it exists...");
        yield db.query("DROP TABLE IF EXISTS channels;");
        console.log("dropping users table, if it exists...");
        yield db.query("DROP TABLE IF EXISTS users;");
        console.log("All existing tables removed");
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.dropExistingTables = dropExistingTables;
const createNewTables = (databasePool) => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV !== "development") {
        return;
    }
    const db = databasePool;
    console.log("Creating new tables...");
    try {
        console.log("creating channels table...");
        yield db.query(`
      CREATE TABLE IF NOT EXISTS channels (
        channel_id TEXT NOT NULL PRIMARY KEY,
        platform TEXT NOT NULL
      );
    `);
        console.log("creating users table...");
        yield db.query(`
      CREATE TABLE IF NOT EXISTS users (
        username TEXT UNIQUE NOT NULL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        created_on TIMESTAMP NOT NULL
      );
    `);
        console.log("creating saved_channels table...");
        yield db.query(`
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
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.createNewTables = createNewTables;
const initialiseDatabase = (databasePool) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, exports.dropExistingTables)(databasePool);
        yield (0, exports.createNewTables)(databasePool);
        console.log("Database initialisation completed successfully");
    }
    catch (error) {
        console.log("Database initialisation completed with errors");
    }
});
exports.initialiseDatabase = initialiseDatabase;
