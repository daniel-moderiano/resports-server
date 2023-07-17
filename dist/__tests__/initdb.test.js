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
describe("database initialisation", () => {
    describe("empty tables are created", () => {
        it("should create 2 empty tables", () => __awaiter(void 0, void 0, void 0, function* () {
            // const users = await selectAllFromTable('users');
            const channels = yield (0, generalHelpers_1.selectAllFromTable)("channels");
            const subscriptions = yield (0, generalHelpers_1.selectAllFromTable)("subscriptions");
            // If the table is present, it will be identifiable here with zero rows
            // expect(users.rows).toHaveLength(0);
            expect(channels.rows).toHaveLength(0);
            expect(subscriptions.rows).toHaveLength(0);
        }));
    });
});
