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
exports.updateSubscription = exports.deleteSubscription = exports.insertSubscription = exports.selectUserSubscriptions = exports.selectSubscription = void 0;
const _1 = require(".");
// SUBSCRIPTIONS TABLE FUNCTIONS
// Although in the database the ID is a numeric type, subscription ID will frequently be in the form of a string elsewhere. Whether the query is made using string or int input does not change the outcome, hence both types are accepted
const selectSubscription = (subscriptionId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, _1.getDevelopmentDatabase)();
    return db.query("SELECT * FROM subscriptions WHERE subscription_id=$1", [
        subscriptionId,
    ]);
});
exports.selectSubscription = selectSubscription;
const selectUserSubscriptions = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, _1.getDevelopmentDatabase)();
    return db.query("SELECT * FROM subscriptions WHERE user_id=$1", [userId]);
});
exports.selectUserSubscriptions = selectUserSubscriptions;
const insertSubscription = (subscription) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, _1.getDevelopmentDatabase)();
    return db.query("INSERT INTO subscriptions (user_id, channel_id, platform) VALUES ($1, $2, $3) RETURNING *", [subscription.userId, subscription.channelId, subscription.platform]);
});
exports.insertSubscription = insertSubscription;
const deleteSubscription = (subscriptionId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, _1.getDevelopmentDatabase)();
    return db.query("DELETE FROM subscriptions WHERE subscription_id=$1 RETURNING *", [subscriptionId]);
});
exports.deleteSubscription = deleteSubscription;
const updateSubscription = (updatedSubscription) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, _1.getDevelopmentDatabase)();
    return db.query("UPDATE subscriptions SET user_id=$2, channel_id=$3, platform=$4 WHERE subscription_id=$1 RETURNING *", [
        updatedSubscription.subscriptionId,
        updatedSubscription.userId,
        updatedSubscription.channelId,
        updatedSubscription.platform,
    ]);
});
exports.updateSubscription = updateSubscription;
