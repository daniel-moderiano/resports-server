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
const generalHelpers_1 = require("../db/generalHelpers");
require("./dbSetupTeardown");
describe("Generalised database helper/utility functions", () => {
    it("should select all items from the table", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, generalHelpers_1.selectAllFromTable)("channels");
        expect(res.rows).toHaveLength(0);
    }));
    it("should drop selected table", () => __awaiter(void 0, void 0, void 0, function* () {
        // Cannot drop other tables as they have dependencies
        yield (0, generalHelpers_1.dropTable)("subscriptions");
        // Aim to access this table. An error should be thrown
        (0, generalHelpers_1.selectAllFromTable)("subscriptions").catch((err) => {
            // Check for custom severity property thrown by node-pg
            expect(err.severity).toBe("ERROR");
        });
    }));
});
