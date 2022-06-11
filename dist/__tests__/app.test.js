"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
// Format #1
it("Returns hello on GET route", done => {
    (0, supertest_1.default)(app_1.default)
        .get('/')
        .expect('Hello')
        .expect(200, done);
});
describe('Routes', () => {
    describe('User routes', () => {
        it("User route correctly configured", done => {
            (0, supertest_1.default)(app_1.default)
                .get('/api/users/')
                .expect('User route')
                .expect(200, done);
        });
        it("Login route correctly configured", done => {
            (0, supertest_1.default)(app_1.default)
                .get('/api/users/login')
                .expect('Protected login route')
                .expect(200, done);
        });
        it("Logout route correctly configured", done => {
            (0, supertest_1.default)(app_1.default)
                .get('/api/users/logout')
                .expect('Logout route')
                .expect(200, done);
        });
    });
    describe('Channel routes', () => {
        it("User route correctly configured", done => {
            (0, supertest_1.default)(app_1.default)
                .get('/api/channels/')
                .expect('Channel route')
                .expect(200, done);
        });
    });
    describe('Subscription routes', () => {
        it("User route correctly configured", done => {
            (0, supertest_1.default)(app_1.default)
                .get('/api/subscriptions/')
                .expect('Subscription route')
                .expect(200, done);
        });
    });
});
// // #Format #2
// it("Return Hello once more", async () => {
//   const res = await request(app).get('/');
//   expect(res.statusCode).toEqual(200);
//   expect(res.text).toBe('Hello');
// });
