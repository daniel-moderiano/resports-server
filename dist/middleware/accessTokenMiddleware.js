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
exports.getAccessToken = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const cross_fetch_1 = __importDefault(require("cross-fetch"));
// Use this middleware on any route that is making requests to the Auth0 management API. It will request a new JWT before attempting to call the API, so you can be sure you're always making requests with a valid JWT (otherwise tokens will expire in 24 hours)
exports.getAccessToken = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // * These IDs/secrets are NOT the same as the Resports app credentials used elsewhere
    const payload = {
        client_id: process.env.API_CLIENT_ID,
        client_secret: process.env.API_CLIENT_SECRET,
        audience: `${process.env.ISSUER}/api/v2/`,
        grant_type: "client_credentials",
    };
    const response = yield (0, cross_fetch_1.default)(`${process.env.ISSUER}/oauth/token`, {
        method: "post",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (response.status !== 200) {
        // error with request
        const error = yield response.json();
        res.status(response.status);
        throw new Error(error.error_description);
    }
    // Successful request. Extract token from response payload and attach to res.locals for easy access
    const data = yield response.json();
    res.locals.apiToken = data.access_token;
    next();
}));
