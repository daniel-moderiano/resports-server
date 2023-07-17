"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const channelControllers_1 = require("../controllers/channelControllers");
const express_openid_connect_1 = require("express-openid-connect");
const router = express_1.default.Router();
// Base path /api/channels
router.get("/", (0, express_openid_connect_1.requiresAuth)(), channelControllers_1.getAllChannels);
router.get("/:channelId", (0, express_openid_connect_1.requiresAuth)(), channelControllers_1.getChannel);
exports.default = router;
