"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTestUser = void 0;
// Add mock user to res.locals to make available in tests. Import any test files as required, but be sure to use it prior to defining route with controller being tests
const addTestUser = (req, res, next) => {
    const testUser = {
        nickname: "test",
        name: "Test User",
        picture: "https://fake.content.user-avatar",
        updated_at: "2022-06-15T02:01:58.483Z",
        email: "test@gmail.com",
        email_verified: false,
        sub: "google-oauth2|12345678910",
    };
    // Assign the test user to res.locals object
    res.locals.user = testUser;
    next();
};
exports.addTestUser = addTestUser;
