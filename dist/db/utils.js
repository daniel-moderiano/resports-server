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
exports.dropTable = exports.select = exports.insert = exports.createTable = void 0;
const _1 = __importDefault(require("."));
const createTable = function (tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = (0, _1.default)();
        return db.query(`CREATE TABLE IF NOT EXISTS ${tableName} (id SERIAL PRIMARY KEY, name VARCHAR(40) not null, price NUMERIC(10, 2));`);
    });
};
exports.createTable = createTable;
const insert = function (tableName, itemName, price) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = (0, _1.default)();
        return db.query(`INSERT INTO ${tableName} (name, price) VALUES ('${itemName}', '${price}');`);
    });
};
exports.insert = insert;
const select = function (tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = (0, _1.default)();
        return db.query(`SELECT * FROM ${tableName}`);
    });
};
exports.select = select;
const dropTable = function (tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = (0, _1.default)();
        yield db.query(`DROP TABLE IF EXISTS ${tableName};`);
    });
};
exports.dropTable = dropTable;
