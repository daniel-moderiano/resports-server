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
exports.deleteSubscriptionController = exports.addSubscription = exports.getSubscription = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const subscriptionHelpers_1 = require("../db/subscriptionHelpers");
const channelHelpers_1 = require("../db/channelHelpers");
const express_validator_1 = require("express-validator");
const db_1 = require("../db");
// @desc    Get subscription
// @route   GET /api/subscriptions/subscriptionId
// @access  Private
const getSubscription = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Search for and extract selected subscription from database
    const result = yield (0, subscriptionHelpers_1.selectSubscription)(req.params.subscriptionId);
    const subscription = result.rows[0];
    if (!subscription) {
        // subscription not found
        res.status(400);
        throw new Error("subscription not found");
    }
    // subscription found in db; return subscription details
    res.status(200).json(subscription);
}));
exports.getSubscription = getSubscription;
// @desc    Add new subscription
// @route   POST /api/subscriptions
// @access  Private
const addSubscription = [
    // Validate input
    (0, express_validator_1.body)("channelId", "Channel ID is required")
        .trim()
        .isString()
        .isLength({ min: 1 }),
    (0, express_validator_1.body)("channelName", "Channel name is required")
        .trim()
        .isString()
        .isLength({ min: 1 }),
    (0, express_validator_1.body)("platform", "Video platform is required")
        .trim()
        .isString()
        .isLength({ min: 1 }),
    // Process request after input data has been validated
    (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Because this route is protected, this controller will not be reached unless the user is authenticated. Therefore, we will always have access too res.oidc.user at this point. A conditional check may be redundant here.
        let userId;
        // For testing purposes, use the res.locals object, which can be changed to suit testing needs
        if (process.env.TEST_ENV === "true") {
            userId = res.locals.user.sub;
        }
        else {
            userId = req.oidc.user.sub;
        }
        // Extract the validation errors from a request
        const errors = (0, express_validator_1.validationResult)(req);
        // Validation errors have occurred. Return these to the user
        if (!errors.isEmpty()) {
            res.status(400).json(errors.array()); // Do not throw single error here, pass all validation errors
        }
        else {
            // First add channel,otherwise the subscription will have no row/table reference
            yield (0, channelHelpers_1.upsertChannel)({
                channelId: req.body.channelId,
                channelName: req.body.channelId,
            });
            const result = yield (0, subscriptionHelpers_1.insertSubscription)({
                channelId: req.body.channelId,
                userId: userId,
                platform: req.body.platform,
            });
            // It is safe to assign directly to SubscriptionDbResult here, as any failure in insert would throw error rather then leave row[0] undefined
            const newSubscription = result.rows[0];
            res.status(200).json(newSubscription);
        }
    })),
];
exports.addSubscription = addSubscription;
// @desc    Delete subscription
// @route   DELETE /api/subscriptions/subscriptionId
// @access  Private
// * Named with 'Controller' suffix to distinguish from database helper function with the same name
const deleteSubscriptionController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Attempt delete operation on specified subscription, and extract details of deleted subscription
    const result = yield (0, subscriptionHelpers_1.deleteSubscription)(req.params.subscriptionId);
    const deletedSubscription = result.rows[0];
    if (!deletedSubscription) {
        // subscription not found
        res.status(400);
        throw new Error("subscription not found");
    }
    // subscription found in db and deleted. Check for any additional or 'associated' subscriptions for the same channel
    const associatedSubscriptions = yield (0, db_1.getDevelopmentDatabase)().query("SELECT * FROM subscriptions WHERE channel_id=$1", [deletedSubscription.channel_id]);
    if (associatedSubscriptions.rowCount === 0) {
        // We removed the only subscription to that channel; remove the channel
        yield (0, channelHelpers_1.deleteChannel)(deletedSubscription.channel_id);
    }
    // Finally, return the deleted subscription in case additional UI information requires it
    res.status(200).json(deletedSubscription);
}));
exports.deleteSubscriptionController = deleteSubscriptionController;
