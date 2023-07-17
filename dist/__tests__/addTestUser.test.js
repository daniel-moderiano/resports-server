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
const testUserMiddleware_1 = require("../middleware/testUserMiddleware");
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
require("./dbSetupTeardown");
// * User ID will only be accessible in a test environment within this controller
process.env.TEST_ENV === "true";
// Setup new app instance
const app = (0, express_1.default)();
// Add mock user to res.locals to make available in tests
app.use(testUserMiddleware_1.addTestUser);
// Simple index route to return the userId that should have been added by the test middleware
app.get("/", (req, res) => {
    const userId = res.locals.user.sub;
    res.json({ userId });
});
describe("addTestUser middleware", () => {
    it("attaches a userId property via the res.locals.user.sub object", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/");
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toStrictEqual({ userId: "google-oauth2|12345678910" });
    }));
});
