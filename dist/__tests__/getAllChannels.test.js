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
const channelControllers_1 = require("../controllers/channelControllers");
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
require("./dbSetupTeardown");
const channelHelpers_1 = require("../db/channelHelpers");
// Setup new app instance
const app = (0, express_1.default)();
// Use the controller
app.get("/", channelControllers_1.getAllChannels);
describe("getAllChannels controller", () => {
    // Add some channels to the test database
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, channelHelpers_1.insertChannel)({ channelId: "1234", channelName: "VGBootCamp" });
        yield (0, channelHelpers_1.insertChannel)({ channelId: "5678", channelName: "BTSSmash" });
    }));
    it("retrieves all channels in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/");
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.statusCode).toEqual(200);
        // There are two channels in the database
        expect(res.body).toStrictEqual([
            { channel_id: "1234", channel_name: "VGBootCamp" },
            { channel_id: "5678", channel_name: "BTSSmash" },
        ]);
    }));
    it("returns empty array when no channels exist in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        // Delete existing channels first
        yield (0, channelHelpers_1.deleteChannel)("1234");
        yield (0, channelHelpers_1.deleteChannel)("5678");
        const res = yield (0, supertest_1.default)(app).get("/");
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toStrictEqual([]);
    }));
});
