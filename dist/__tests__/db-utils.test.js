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
const utils_1 = require("../db/utils");
require("./dbSetupTeardown");
describe('database utils', () => {
    describe('createTable', () => {
        it('should create the table in the database', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, utils_1.createTable)('items');
            // Because the table has just been created, no rows should exist
            expect(res.rowCount).toBeNull();
        }));
    });
    describe('insert', () => {
        it('should insert an item into the table', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, utils_1.insert)('items', 'steering wheel', 62.59);
            expect(res.rowCount).toEqual(1);
        }));
    });
    describe('select', () => {
        it('should select items from the table', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, utils_1.select)('items');
            // After each db test run, the 'items' table will be dropped, so we can be sure there is only one row in the table - the row inserted in the insert test
            expect(res.rows[0]).toStrictEqual({ id: 1, name: 'steering wheel', price: '62.59' });
        }));
    });
});
