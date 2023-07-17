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
exports.getEmailVerification = exports.getPasswordChange = exports.getUserSubscriptions = exports.deleteUser = exports.updateUser = exports.getUser = exports.getCurrentUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const express_validator_1 = require("express-validator");
const subscriptionHelpers_1 = require("../db/subscriptionHelpers");
// @desc    Return the currently logged in user
// @route   GET /api/users/current
// @access  Private
const getCurrentUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // As a protected route, this function should always have access to req.oidc.user; this check may be redundant
    if (!req.oidc.user) {
        res.status(500);
        throw new Error("An error occurred while fetching user data");
    }
    const userData = req.oidc.user;
    res.status(200).json(userData);
}));
exports.getCurrentUser = getCurrentUser;
// @desc    Get a user
// @route   GET /api/users/:userId
// @access  Private
const getUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Call Auth0 API with appropriate Bearer token to grant authorisation (will be on res.locals as a result of getAccessToken middleware)
    const response = yield (0, cross_fetch_1.default)(`${process.env.ISSUER}/api/v2/users/${req.params.userId}`, {
        method: "get",
        headers: {
            Authorization: `Bearer ${res.locals.apiToken}`,
        },
    });
    if (response.status !== 200) {
        // error occurred with API request
        const error = yield response.json();
        res.status(error.statusCode);
        throw new Error(error.message);
    }
    // Successful fetch response
    const user = yield response.json();
    res.status(200).json(user);
}));
exports.getUser = getUser;
// @desc    Update user details
// @route   PUT /api/users/:userId
// @access  Private
const updateUser = [
    // Validate input. Only these details are changeable. These are validated by Auth0 as well so this may be redundant. But this does provide an easier way to give useful error messages
    (0, express_validator_1.body)("email", "Email is required").trim().isString().isLength({ min: 1 }),
    (0, express_validator_1.body)("nickname", "Nickname is required")
        .trim()
        .isString()
        .isLength({ min: 1 }),
    // Process request after input data has been validated
    (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Extract the validation errors from a request
        const errors = (0, express_validator_1.validationResult)(req);
        // Validation errors have occurred. Return these to the user
        if (!errors.isEmpty()) {
            res.status(400).json(errors.array()); // Do not throw single error here, pass all validation errors
        }
        // Validation has passed, continue with user update
        const currentUserData = req.oidc.user;
        // This check is performed in order to determine if a new email verification link is required
        const emailChanged = currentUserData.email !== req.body.email;
        // Call Auth0 API with appropriate Bearer token
        const response = yield (0, cross_fetch_1.default)(`${process.env.ISSUER}/api/v2/users/${req.params.userId}`, {
            method: "patch",
            headers: {
                Authorization: `Bearer ${res.locals.apiToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: req.body.email,
                nickname: req.body.nickname,
            }),
        });
        if (response.status !== 200) {
            // error occurred with API request
            const error = yield response.json();
            res.status(error.statusCode);
            throw new Error(error.message);
        }
        // Successful fetch response
        const updatedUser = yield response.json();
        // After successful update, resend email verification link if email has been changed
        if (emailChanged) {
            // * Do not bother with error handling here. The update operation has succeeded; this is a side effect only.
            yield (0, cross_fetch_1.default)(`${process.env.ISSUER}/api/v2/jobs/verification-email`, {
                method: "post",
                headers: {
                    Authorization: `Bearer ${res.locals.apiToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: req.params.userId,
                    client_id: process.env.CLIENT_ID,
                }),
            });
        }
        res.status(200).json(updatedUser);
    })),
];
exports.updateUser = updateUser;
// @desc    Delete user
// @route   DELETE /api/users/:userId
// @access  Private
const deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Call Auth0 API with appropriate Bearer token
    const response = yield (0, cross_fetch_1.default)(`${process.env.ISSUER}/api/v2/users/${req.params.userId}`, {
        method: "delete",
        headers: {
            Authorization: `Bearer ${res.locals.apiToken}`,
        },
    });
    if (response.status !== 204) {
        // error occurred with API request
        const error = yield response.json();
        res.status(error.statusCode);
        throw new Error(error.message);
    }
    // 204 status is returned when the user either does not exist, or has been deleted. Both are considered and handled the same way here. However, 204 status also indicates no content, hence a 200 is used to attach some feedback
    res.status(200).json({ message: "User deleted" });
}));
exports.deleteUser = deleteUser;
// @desc    Enable a user to change their password
// @route   GET /api/users/:userId/password-change
// @access  Private
const getPasswordChange = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // First fetch all user details (specifically to access connection type)
    const getUserResponse = yield (0, cross_fetch_1.default)(`${process.env.ISSUER}/api/v2/users/${req.params.userId}`, {
        method: "get",
        headers: {
            Authorization: `Bearer ${res.locals.apiToken}`,
        },
    });
    if (getUserResponse.status !== 200) {
        // error occurred with API request
        const error = yield getUserResponse.json();
        res.status(error.statusCode);
        throw new Error(error.message);
    }
    // Successful fetch response
    const userData = yield getUserResponse.json();
    // With user data we are now able to construct POST request to change password
    const passwordChangeResponse = yield (0, cross_fetch_1.default)(`${process.env.ISSUER}/dbconnections/change_password`, {
        method: "post",
        headers: {
            Authorization: `Bearer ${res.locals.apiToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            client_id: process.env.CLIENT_ID,
            email: userData.email,
            connection: userData.identities[0].connection,
        }),
    });
    if (passwordChangeResponse.status !== 200) {
        // Issue with email passowrd reset request
        const errorData = yield passwordChangeResponse.json();
        res.status(passwordChangeResponse.status);
        throw new Error(errorData.error);
    }
    // Successful request, inform user with a simple message
    res.json({ message: "Password reset email sent" });
}));
exports.getPasswordChange = getPasswordChange;
// @desc    Resend a verification email to the user
// @route   GET /api/users/:userId/email-verification
// @access  Private
const getEmailVerification = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Make POST request with user data. Note this API endpoint is distinct from the user management API above
    const response = yield (0, cross_fetch_1.default)(`${process.env.ISSUER}/api/v2/jobs/verification-email`, {
        method: "post",
        headers: {
            Authorization: `Bearer ${res.locals.apiToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: req.params.userId,
            client_id: process.env.CLIENT_ID,
        }),
    });
    if (response.status !== 200) {
        // error occurred with API request
        const error = yield response.json();
        res.status(error.statusCode);
        throw new Error(error.message);
    }
    // Successful API call. No content really required here, so a simple JSON message is provided
    res.json({ message: "Email verification link sent" });
}));
exports.getEmailVerification = getEmailVerification;
// @desc    Get user subscriptions
// @route   GET /api/user/:userId/subscriptions
// @access  Private
const getUserSubscriptions = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, subscriptionHelpers_1.selectUserSubscriptions)(req.params.userId);
    res.json(result.rows);
}));
exports.getUserSubscriptions = getUserSubscriptions;
