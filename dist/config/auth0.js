"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
// Auth0 configuration. Used inside the auth router in app.ts
exports.config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER,
};
