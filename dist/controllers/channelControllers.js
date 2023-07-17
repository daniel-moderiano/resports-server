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
exports.getChannel = exports.getAllChannels = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const generalHelpers_1 = require("../db/generalHelpers");
const channelHelpers_1 = require("../db/channelHelpers");
// @desc    Get all channels
// @route   GET /api/channels
// @access  Private
const getAllChannels = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, generalHelpers_1.selectAllFromTable)("channels");
    res.json(result.rows);
}));
exports.getAllChannels = getAllChannels;
// @desc    Get channel
// @route   GET /api/channels/channelId
// @access  Private
const getChannel = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Select specified channel from database, and extract the information
    const result = yield (0, channelHelpers_1.selectChannel)(req.params.channelId);
    const channel = result.rows[0];
    if (!channel) {
        // channel not found
        res.status(400);
        throw new Error("channel not found");
    }
    // Channel found in db; return channel details
    res.status(200).json(channel);
}));
exports.getChannel = getChannel;
