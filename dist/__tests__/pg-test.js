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
const db_1 = require("../db");
const initdb_1 = require("../db/initdb");
const db = (0, db_1.getTestDatabase)();
// Ensure all tables are first dropped before re-creating them anew in the test DB
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, initdb_1.initialiseDatabase)(db);
}));
// Close the pool on completion
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db.end();
}));
it("completes", () => __awaiter(void 0, void 0, void 0, function* () {
    let numRows = 0;
    const queryResult = yield db.query(`SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'`);
    numRows = queryResult.rows.length;
    expect(numRows).toBe(3);
}));
