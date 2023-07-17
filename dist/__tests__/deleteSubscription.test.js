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
const subscriptionControllers_1 = require("../controllers/subscriptionControllers");
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
require("./dbSetupTeardown");
const channelHelpers_1 = require("../db/channelHelpers");
const subscriptionHelpers_1 = require("../db/subscriptionHelpers");
// Setup new app instance
const app = (0, express_1.default)();
// Use the controller
app.delete("/subscriptions/:subscriptionId", subscriptionControllers_1.deleteSubscriptionController);
describe("deleteSubscription controller", () => {
    // Add subscriptions to the test database
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, channelHelpers_1.insertChannel)({ channelId: "1234", channelName: "VGBootCamp" });
        yield (0, subscriptionHelpers_1.insertSubscription)({
            channelId: "1234",
            platform: "twitch",
            userId: "1234",
        });
        yield (0, subscriptionHelpers_1.insertSubscription)({
            channelId: "1234",
            platform: "twitch",
            userId: "5678",
        });
    }));
    it("deletes subscription in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).delete("/subscriptions/1");
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.statusCode).toEqual(200);
        // The deleted subscription will be returned
        expect(res.body).toStrictEqual({
            subscription_id: 1,
            channel_id: "1234",
            user_id: "1234",
            platform: "twitch",
        });
    }));
    it("does not delete associated subscription channel when other subscriptions to this channel exist", () => __awaiter(void 0, void 0, void 0, function* () {
        // Check that associated channel still exists in db
        const res = yield (0, channelHelpers_1.selectChannel)("1234");
        expect(res.rowCount).toBe(1);
        expect(res.rows[0]).toStrictEqual({
            channel_id: "1234",
            channel_name: "VGBootCamp",
        });
    }));
    it("deletes associated channel if no other subscriptions to this channel exist", () => __awaiter(void 0, void 0, void 0, function* () {
        // First perform delete on remaining subscription
        yield (0, supertest_1.default)(app).delete("/subscriptions/2");
        // Then, check that channel is now removed from db
        const res = yield (0, channelHelpers_1.selectChannel)("1234");
        expect(res.rowCount).toBe(0);
    }));
    it("throws error if subscription is not in database", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).delete("/subscriptions/1");
        // Error will return in text/html form here. In production, a JSON format error will be returned
        expect(res.headers["content-type"]).toMatch(/text/);
        expect(res.statusCode).toEqual(400);
    }));
});
