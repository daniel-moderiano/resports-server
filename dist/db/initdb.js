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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
require("dotenv/config");
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, _1.default)();
    try {
        console.log("dropping users table, if exists...");
        yield db.query('DROP TABLE IF EXISTS users;');
        console.log("dropping channels table, if exists...");
        yield db.query('DROP TABLE IF EXISTS channels;');
        console.log("dropping subscriptions table, if exists...");
        yield db.query('DROP TABLE IF EXISTS subscriptions;');
        console.log("creating users table...");
        yield db.query(`
      CREATE TABLE users (
        user_id TEXT PRIMARY KEY NOT NULL,
        user_email TEXT NOT NULL UNIQUE
      );
    `);
        console.log("creating channels table...");
        yield db.query(`
      CREATE TABLE channels (
        channel_id serial PRIMARY KEY,
        channel_name TEXT
      );
    `);
        console.log("creating subscriptions table...");
        yield db.query(`
      CREATE TABLE subscriptions (
        subscription_id serial PRIMARY KEY,
        user_id TEXT REFERENCES users(user_id),
        channel_id INT REFERENCES channels(channel_id)
      );
    `);
        yield db.end();
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
init().then(() => {
    console.log("finished");
}).catch(() => {
    console.log("finished with errors");
});
