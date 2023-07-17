"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subscriptionControllers_1 = require("../controllers/subscriptionControllers");
const express_openid_connect_1 = require("express-openid-connect");
const router = express_1.default.Router();
// Base path /api/subscriptions
router.post("/", (0, express_openid_connect_1.requiresAuth)(), subscriptionControllers_1.addSubscription);
router.get("/:subscriptionId", (0, express_openid_connect_1.requiresAuth)(), subscriptionControllers_1.getSubscription);
router.delete("/:subscriptionId", (0, express_openid_connect_1.requiresAuth)(), subscriptionControllers_1.deleteSubscriptionController);
exports.default = router;
