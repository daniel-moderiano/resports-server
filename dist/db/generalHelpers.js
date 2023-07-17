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
exports.dropTable = exports.selectAllFromTable = void 0;
const _1 = require(".");
const db = process.env.NODE_ENV === "development"
    ? (0, _1.getDevelopmentDatabase)()
    : (0, _1.getProductionDatabase)();
// GENERALISED FUNCTIONS
const selectAllFromTable = function (tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        return db.query(`SELECT * FROM ${tableName}`);
    });
};
exports.selectAllFromTable = selectAllFromTable;
const dropTable = function (tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.query(`DROP TABLE IF EXISTS ${tableName};`);
    });
};
exports.dropTable = dropTable;
