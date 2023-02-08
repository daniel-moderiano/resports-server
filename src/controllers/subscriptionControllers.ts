import asyncHandler from "express-async-handler";
import {
  selectSubscription,
  insertSubscription,
  deleteSubscription,
} from "../db/subscriptionHelpers";
import { upsertChannel, deleteChannel } from "../db/channelHelpers";
import { body, validationResult } from "express-validator";
import getDb from "../db/index";
import { SubscriptionDbResult } from "../types/databaseTypes";

// @desc    Get subscription
// @route   GET /api/subscriptions/subscriptionId
// @access  Private
const getSubscription = asyncHandler(async (req, res) => {
  // Search for and extract selected subscription from database
  const result = await selectSubscription(req.params.subscriptionId);
  const subscription: SubscriptionDbResult | undefined = result.rows[0];

  if (!subscription) {
    // subscription not found
    res.status(400);
    throw new Error("subscription not found");
  }

  // subscription found in db; return subscription details
  res.status(200).json(subscription);
});

// @desc    Add new subscription
// @route   POST /api/subscriptions
// @access  Private
const addSubscription = [
  // Validate input
  body("channelId", "Channel ID is required")
    .trim()
    .isString()
    .isLength({ min: 1 }),
  body("channelName", "Channel name is required")
    .trim()
    .isString()
    .isLength({ min: 1 }),
  body("platform", "Video platform is required")
    .trim()
    .isString()
    .isLength({ min: 1 }),

  // Process request after input data has been validated
  asyncHandler(async (req, res, next) => {
    // Because this route is protected, this controller will not be reached unless the user is authenticated. Therefore, we will always have access too res.oidc.user at this point. A conditional check may be redundant here.
    let userId: string;

    // For testing purposes, use the res.locals object, which can be changed to suit testing needs
    if (process.env.TEST_ENV === "true") {
      userId = res.locals.user.sub as string;
    } else {
      userId = req.oidc.user!.sub as string;
    }

    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Validation errors have occurred. Return these to the user
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array()); // Do not throw single error here, pass all validation errors
    } else {
      // First add channel,otherwise the subscription will have no row/table reference
      await upsertChannel({
        channelId: req.body.channelId,
        channelName: req.body.channelId,
      });

      const result = await insertSubscription({
        channelId: req.body.channelId,
        userId: userId,
        platform: req.body.platform,
      });

      // It is safe to assign directly to SubscriptionDbResult here, as any failure in insert would throw error rather then leave row[0] undefined
      const newSubscription: SubscriptionDbResult = result.rows[0];

      res.status(200).json(newSubscription);
    }
  }),
];

// @desc    Delete subscription
// @route   DELETE /api/subscriptions/subscriptionId
// @access  Private
// * Named with 'Controller' suffix to distinguish from database helper function with the same name
const deleteSubscriptionController = asyncHandler(async (req, res) => {
  // Attempt delete operation on specified subscription, and extract details of deleted subscription
  const result = await deleteSubscription(req.params.subscriptionId);
  const deletedSubscription: SubscriptionDbResult | undefined = result.rows[0];

  if (!deletedSubscription) {
    // subscription not found
    res.status(400);
    throw new Error("subscription not found");
  }

  // subscription found in db and deleted. Check for any additional or 'associated' subscriptions for the same channel
  const associatedSubscriptions = await getDb().query(
    "SELECT * FROM subscriptions WHERE channel_id=$1",
    [deletedSubscription.channel_id]
  );

  if (associatedSubscriptions.rowCount === 0) {
    // We removed the only subscription to that channel; remove the channel
    await deleteChannel(deletedSubscription.channel_id);
  }

  // Finally, return the deleted subscription in case additional UI information requires it
  res.status(200).json(deletedSubscription);
});

export { getSubscription, addSubscription, deleteSubscriptionController };
