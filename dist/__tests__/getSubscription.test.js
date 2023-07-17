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
const subscriptionHelpers_1 = require("../db/subscriptionHelpers");
const channelHelpers_1 = require("../db/channelHelpers");
// Setup new app instance
const app = (0, express_1.default)();
// Use the controller
app.get("/subscriptions/:subscriptionId", subscriptionControllers_1.getSubscription);
describe("getSubscription controller", () => {
    // Add some channels and subs to the test database
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, channelHelpers_1.insertChannel)({ channelId: "1234", channelName: "VGBootCamp" });
        yield (0, channelHelpers_1.insertChannel)({ channelId: "5678", channelName: "BTSSmash" });
        yield (0, subscriptionHelpers_1.insertSubscription)({
            channelId: "1234",
            platform: "twitch",
            userId: "1234",
        });
        yield (0, subscriptionHelpers_1.insertSubscription)({
            channelId: "5678",
            platform: "twitch",
            userId: "1234",
        });
    }));
    it("retrieves correct subscription in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/subscriptions/2");
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toStrictEqual({
            subscription_id: 2,
            channel_id: "5678",
            user_id: "1234",
            platform: "twitch",
        });
    }));
    it("throws error if subscription is not in database", () => __awaiter(void 0, void 0, void 0, function* () {
        // Delete existing channels first
        yield (0, subscriptionHelpers_1.deleteSubscription)(1);
        yield (0, subscriptionHelpers_1.deleteSubscription)(2);
        const res = yield (0, supertest_1.default)(app).get("/subscriptions/1234");
        // Error will return in text/html form here. In production, a JSON format error will be returned
        expect(res.headers["content-type"]).toMatch(/text/);
        expect(res.statusCode).toEqual(400);
    }));
});
