"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_openid_connect_1 = require("express-openid-connect");
const userControllers_1 = require("../controllers/userControllers");
const accessTokenMiddleware_1 = require("../middleware/accessTokenMiddleware");
const router = express_1.default.Router();
// Base path /api/users
router.get("/current", (0, express_openid_connect_1.requiresAuth)(), userControllers_1.getCurrentUser);
router
    .route("/:userId")
    .get((0, express_openid_connect_1.requiresAuth)(), accessTokenMiddleware_1.getAccessToken, userControllers_1.getUser)
    .delete((0, express_openid_connect_1.requiresAuth)(), accessTokenMiddleware_1.getAccessToken, userControllers_1.deleteUser)
    .patch((0, express_openid_connect_1.requiresAuth)(), accessTokenMiddleware_1.getAccessToken, userControllers_1.updateUser);
router
    .route("/:userId/subscriptions")
    .get((0, express_openid_connect_1.requiresAuth)(), userControllers_1.getUserSubscriptions);
router
    .route("/:userId/password-change")
    .get((0, express_openid_connect_1.requiresAuth)(), accessTokenMiddleware_1.getAccessToken, userControllers_1.getPasswordChange);
router
    .route("/:userId/email-verification")
    .get((0, express_openid_connect_1.requiresAuth)(), accessTokenMiddleware_1.getAccessToken, userControllers_1.getEmailVerification);
exports.default = router;
