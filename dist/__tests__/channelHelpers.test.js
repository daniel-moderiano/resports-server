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
const channelHelpers_1 = require("../db/channelHelpers");
require("./dbSetupTeardown");
describe("Channels table helper/utility functions", () => {
    describe("Upsert channel to table", () => {
        it("should insert a channel into the table where one does not yet exist", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, channelHelpers_1.upsertChannel)({
                channelId: "123456",
                channelName: "BTSSmash",
            });
            expect(res.rowCount).toBe(1);
            expect(res.rows[0]).toStrictEqual({
                channel_id: "123456",
                channel_name: "BTSSmash",
            });
        }));
        it("should update a channel name when one with the same ID exists", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, channelHelpers_1.upsertChannel)({
                channelId: "123456",
                channelName: "VGBootCamp",
            });
            expect(res.rowCount).toBe(1);
            expect(res.rows[0]).toStrictEqual({
                channel_id: "123456",
                channel_name: "VGBootCamp",
            });
        }));
    });
    describe("Select channel from table", () => {
        it("should select channel from the table", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, channelHelpers_1.selectChannel)("123456");
            // Should return inserted channel from test above
            expect(res.rowCount).toBe(1);
            expect(res.rows[0]).toStrictEqual({
                channel_id: "123456",
                channel_name: "VGBootCamp",
            });
        }));
    });
    describe("Update channel in table", () => {
        it("should update and return new channel in the table", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, channelHelpers_1.updateChannel)({
                channelId: "123456",
                channelName: "BTSSmash",
            });
            // Should perform single row update only
            expect(res.rowCount).toBe(1);
            expect(res.rows[0]).toStrictEqual({
                channel_id: "123456",
                channel_name: "BTSSmash",
            });
        }));
    });
    describe("Delete channel from table", () => {
        it("should delete a channel from the table", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, channelHelpers_1.deleteChannel)("123456");
            // Should remove one row only, leaving no more rows in the table
            expect(res.rowCount).toBe(1);
            expect(res.rows).toHaveLength(0);
        }));
    });
});
