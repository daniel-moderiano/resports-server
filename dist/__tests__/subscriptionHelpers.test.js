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
const subscriptionHelpers_1 = require("../db/subscriptionHelpers");
const channelHelpers_1 = require("../db/channelHelpers");
require("./dbSetupTeardown");
describe("Subscriptions table helper/utility functions", () => {
    // Insert user and channel into db before creating subscription entries
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, channelHelpers_1.insertChannel)({
            channelId: "123456",
            channelName: "VGBootCamp",
        });
        // Second channel insert to allow testing of subscription update
        yield (0, channelHelpers_1.insertChannel)({
            channelId: "12345678",
            channelName: "BTSSmash",
        });
    }));
    describe("Add subscription to table", () => {
        it("should insert a subscription into the table", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, subscriptionHelpers_1.insertSubscription)({
                channelId: "123456",
                platform: "twitch",
                userId: "1234",
            });
            expect(res.rowCount).toBe(1);
            expect(res.rows[0]).toStrictEqual({
                subscription_id: 1,
                channel_id: "123456",
                user_id: "1234",
                platform: "twitch",
            });
        }));
    });
    describe("Select subscription from table using subscription ID", () => {
        it("should select subscription from the table using integer input", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, subscriptionHelpers_1.selectSubscription)(1);
            // Should return inserted channel from test above
            expect(res.rowCount).toBe(1);
            expect(res.rows[0]).toStrictEqual({
                subscription_id: 1,
                channel_id: "123456",
                user_id: "1234",
                platform: "twitch",
            });
        }));
        it("should select subscription from the table using string input", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, subscriptionHelpers_1.selectSubscription)("1");
            // Should return inserted channel from test above
            expect(res.rowCount).toBe(1);
            expect(res.rows[0]).toStrictEqual({
                subscription_id: 1,
                channel_id: "123456",
                user_id: "1234",
                platform: "twitch",
            });
        }));
    });
    describe("Update subscription in table", () => {
        it("should update and return new subscription in the table (integer input)", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, subscriptionHelpers_1.updateSubscription)({
                subscriptionId: 1,
                channelId: "123456",
                userId: "1234",
                platform: "youtube",
            });
            // Should perform single row update only
            expect(res.rowCount).toBe(1);
            expect(res.rows[0]).toStrictEqual({
                subscription_id: 1,
                channel_id: "123456",
                user_id: "1234",
                platform: "youtube",
            });
        }));
        it("should update and return new subscription in the table (string input)", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, subscriptionHelpers_1.updateSubscription)({
                subscriptionId: "1",
                channelId: "123456",
                userId: "1234",
                platform: "twitch",
            });
            // Should perform single row update only
            expect(res.rowCount).toBe(1);
            expect(res.rows[0]).toStrictEqual({
                subscription_id: 1,
                channel_id: "123456",
                user_id: "1234",
                platform: "twitch",
            });
        }));
    });
    describe("Delete subscription from table", () => {
        it("should delete a subscription from the table (integer input) and return deleted subscription", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, subscriptionHelpers_1.deleteSubscription)(1);
            // Should remove one row only, leaving no more rows in the table
            expect(res.rowCount).toBe(1);
            expect(res.rows[0]).toStrictEqual({
                subscription_id: 1,
                channel_id: "123456",
                user_id: "1234",
                platform: "twitch",
            });
        }));
        it("should delete a subscription from the table (string input) and return deleted subscription", () => __awaiter(void 0, void 0, void 0, function* () {
            // Reinsert subscription
            yield (0, subscriptionHelpers_1.insertSubscription)({
                channelId: "123456",
                platform: "twitch",
                userId: "1234",
            });
            // Note the ID is '2' here, as the previously deleted subscriptions holds on to ID '1' despite deletion
            const res = yield (0, subscriptionHelpers_1.deleteSubscription)("2");
            // Should remove one row only, leaving no more rows in the table
            expect(res.rowCount).toBe(1);
            expect(res.rows[0]).toStrictEqual({
                subscription_id: 2,
                channel_id: "123456",
                user_id: "1234",
                platform: "twitch",
            });
        }));
    });
    describe("Select subscriptions from table using user ID", () => {
        it("should select all subscriptions belonging to one user from the table", () => __awaiter(void 0, void 0, void 0, function* () {
            // Insert some extra subscriptions into the db
            yield (0, subscriptionHelpers_1.insertSubscription)({
                channelId: "123456",
                platform: "twitch",
                userId: "1234",
            });
            yield (0, subscriptionHelpers_1.insertSubscription)({
                channelId: "12345678",
                platform: "twitch",
                userId: "1234",
            });
            yield (0, subscriptionHelpers_1.insertSubscription)({
                channelId: "12345678",
                platform: "twitch",
                userId: "5678",
            });
            const res = yield (0, subscriptionHelpers_1.selectUserSubscriptions)("1234");
            // Should return two of the three subscriptions in the database (note IDs to be 3 and 4, as two previous subscriptions have already been inserted in previous tests)
            expect(res.rowCount).toBe(2);
            expect(res.rows).toStrictEqual([
                {
                    subscription_id: 3,
                    channel_id: "123456",
                    user_id: "1234",
                    platform: "twitch",
                },
                {
                    subscription_id: 4,
                    channel_id: "12345678",
                    user_id: "1234",
                    platform: "twitch",
                },
            ]);
        }));
    });
});
