"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const channelRoutes_1 = __importDefault(require("./routes/channelRoutes"));
const subscriptionRoutes_1 = __importDefault(require("./routes/subscriptionRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const auth0_1 = require("./config/auth0");
const express_openid_connect_1 = require("express-openid-connect");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const signupController_1 = require("./controllers/signupController");
const app = (0, express_1.default)();
// Allow parsing of form data in req.body for POST and other requests
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// * Although the form_post warning appears, requests should still be able to be sent fine with HTTP. If issues occur, run the npm https script
// auth router attaches /login, /logout, and /callback routes to the baseURL.
// Sign-up route is manually attached
app.use((0, express_openid_connect_1.auth)(auth0_1.config));
app.get("/sign-up", signupController_1.signupController);
// Use routes
app.use("/api/users", userRoutes_1.default);
app.use("/api/channels", channelRoutes_1.default);
app.use("/api/subscriptions", subscriptionRoutes_1.default);
// Use error handler AFTER all routes are defined above
app.use(errorMiddleware_1.errorHandler);
exports.default = app;
