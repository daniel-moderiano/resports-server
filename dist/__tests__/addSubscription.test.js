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
const testUserMiddleware_1 = require("../middleware/testUserMiddleware");
// * User ID will only be accessible in a test environment within this controller
process.env.TEST_ENV === "true";
// Setup new app instance
const app = (0, express_1.default)();
// Required to parse incoming body params
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Add mock user to res.locals to make available in tests
app.use(testUserMiddleware_1.addTestUser);
// Use the controller
app.post("/subscriptions", subscriptionControllers_1.addSubscription);
describe("getSubscription controller", () => {
    it("adds new subscription when all details are provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/subscriptions").send({
            channelId: "1234",
            channelName: "VGBootCamp",
            userId: "google-oauth2|12345678910",
            platform: "twitch",
        });
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toStrictEqual({
            channel_id: "1234",
            user_id: "google-oauth2|12345678910",
            platform: "twitch",
            subscription_id: 1,
        });
    }));
    it("throws error if attempting to add duplicate subscription", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/subscriptions").send({
            channelId: "1234",
            channelName: "VGBootCamp",
            userId: "google-oauth2|12345678910",
            platform: "twitch",
        });
        // Will be text-response in test env, and JSON in prod env
        expect(res.headers["content-type"]).toMatch(/text/);
        expect(res.text).toContain("duplicate");
        expect(res.statusCode).toEqual(500);
    }));
    it("throws error if platform is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post("/subscriptions")
            .send({ channelId: "1234", channelName: "VGBootCamp" });
        // Error will return in text/html form here. In production, a JSON format error will be returned
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.statusCode).toEqual(400);
        // Should return array of errors, in this case single error for missing param
        expect(res.body.length).toBe(1);
    }));
    it("throws error if channel ID is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post("/subscriptions")
            .send({ platform: "twitch", channelName: "VGBootCamp" });
        // Error will return in text/html form here. In production, a JSON format error will be returned
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.statusCode).toEqual(400);
        // Should return array of errors, in this case single error for missing param
        expect(res.body.length).toBe(1);
    }));
    it("throws error if channel name is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post("/subscriptions")
            .send({ platform: "twitch", channelId: "1234" });
        // Error will return in text/html form here. In production, a JSON format error will be returned
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.statusCode).toEqual(400);
        // Should return array of errors, in this case single error for missing param
        expect(res.body.length).toBe(1);
    }));
});
