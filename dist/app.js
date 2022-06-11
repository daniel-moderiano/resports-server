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
const express_1 = __importDefault(require("express"));
const channelRoutes_1 = __importDefault(require("./routes/channelRoutes"));
const subscriptionRoutes_1 = __importDefault(require("./routes/subscriptionRoutes"));
const index_1 = __importDefault(require("./db/index"));
require("dotenv/config");
const express_openid_connect_1 = require("express-openid-connect");
process.env.TEST_ENV = 'false';
const app = (0, express_1.default)();
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER
};
// auth router attaches /login, /logout, and /callback routes to the baseURL
// * Although the form_post notification appears, requests should still be able to be sent fine with HTTP. If issues occur, run the npm https script
app.use((0, express_openid_connect_1.auth)(config));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, index_1.default)();
    yield db.connect();
    console.log('Postgres connected');
}))();
// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    if (req.oidc.isAuthenticated() && req.oidc.user) {
        console.log(req.oidc.user);
        console.log(`User ID: ${req.oidc.user.sub.split('|')[1]}`);
        res.send('Logged in');
    }
    else {
        res.send('Unauthorised, please log in');
    }
});
// Use routes
// app.use('/api/users', userRoutes);
app.use('/api/channels', channelRoutes_1.default);
app.use('/api/subscriptions', subscriptionRoutes_1.default);
exports.default = app;
