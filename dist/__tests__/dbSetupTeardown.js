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
const db_1 = __importDefault(require("../db"));
const utils_1 = require("../db/utils");
// ! Ensure test DB is used
process.env.TEST_ENV = 'true';
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, utils_1.dropTable)('items');
}))();
// Ensure test tables are dropped
// TODO: create utility to drop all tables
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, utils_1.dropTable)('items');
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, utils_1.dropTable)('items');
    yield (0, db_1.default)().end();
}));
