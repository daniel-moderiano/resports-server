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
exports.fetchItemNames = exports.fetchAllItems = void 0;
const utils_1 = require("./utils");
// An example function to test where a function calls our previously tested db-utils
const fetchAllItems = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return (0, utils_1.select)('items');
        }
        catch (err) {
            throw err;
        }
    });
};
exports.fetchAllItems = fetchAllItems;
const fetchItemNames = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const items = yield (0, utils_1.select)('items');
            return items.rows.map(({ name }) => name.toUpperCase());
        }
        catch (err) {
            throw err;
        }
    });
};
exports.fetchItemNames = fetchItemNames;
