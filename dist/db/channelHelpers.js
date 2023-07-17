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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChannel = exports.deleteChannel = exports.upsertChannel = exports.insertChannel = exports.selectChannel = void 0;
const _1 = require(".");
// CHANNELS TABLE FUNCTIONS
const selectChannel = (channelId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, _1.getDevelopmentDatabase)();
    return db.query("SELECT * FROM channels WHERE channel_id=$1", [channelId]);
});
exports.selectChannel = selectChannel;
const insertChannel = (channel) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, _1.getDevelopmentDatabase)();
    return db.query("INSERT INTO channels (channel_id, channel_name) VALUES ($1, $2) RETURNING *", [channel.channelId, channel.channelName]);
});
exports.insertChannel = insertChannel;
// With many users, channel db conflicts are likely. Upsert is preferred here, as video platforms allow channel name changes. This will allow the channel entries to better reflect name changes on the platform
const upsertChannel = (channel) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, _1.getDevelopmentDatabase)();
    return db.query("INSERT INTO channels (channel_id, channel_name) VALUES ($1, $2) ON CONFLICT (channel_id) DO UPDATE SET channel_name = $2 RETURNING *", [channel.channelId, channel.channelName]);
});
exports.upsertChannel = upsertChannel;
const deleteChannel = (channelId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, _1.getDevelopmentDatabase)();
    return db.query("DELETE FROM channels WHERE channel_id=$1", [channelId]);
});
exports.deleteChannel = deleteChannel;
const updateChannel = (updatedChannel) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, _1.getDevelopmentDatabase)();
    return db.query("UPDATE channels SET channel_name=$2 WHERE channel_id=$1 RETURNING *", [updatedChannel.channelId, updatedChannel.channelName]);
});
exports.updateChannel = updateChannel;
