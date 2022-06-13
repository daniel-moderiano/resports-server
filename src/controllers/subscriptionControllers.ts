import asyncHandler from 'express-async-handler';
import { deleteSubscription, insertSubscription, selectAllFromTable, selectSubscription } from '../db/helpers';
import { body, validationResult } from 'express-validator'

interface Subscription {
  subscription_id: number;
  user_id: string;
  channel_id: string;
  platform: string;
}


// @desc    Get subscription
// @route   GET /api/subscriptions/subscriptionId
// @access  Private
const getSubscription = asyncHandler(async (req, res) => {
  let userId: string | undefined;

  // For testing purposes, use the res.locals object, which can be changed to suit testing needs
  if (process.env.TEST_ENV === 'true') {
    userId = res.locals.user!.sub.split('|')[1] as string
    console.log('Testing', userId);
  } else {
    userId = req.oidc.user!.sub.split('|')[1] as string;
  }

  // subscription ID grabbed from URL params
  const subscriptionId = req.params.subscriptionId;
  const result = await selectSubscription(subscriptionId);

  // ? Is this typescript addition needlessly complex?
  const subscription: Subscription | undefined = result.rows[0];

  if (!subscription) {    // subscription not found
    res.status(400);
    throw new Error('subscription not found');
  }

  // subscription found in db; return subscription details
  res.status(200).json(subscription);
});


// @desc    Add new subscription
// @route   POST /api/subscriptions
// @access  Private
const addSubscription = [
  // Validate input
  body('channelId', 'Channel ID is required').trim().isString().isLength({ min: 1 }),
  body('platform', 'Video platform is required').trim().isString().isLength({ min: 1 }),

  // Process request after input data has been validated
  asyncHandler(async (req, res, next) => {
    // Because this route is protected, this controller will not be reached unless the user is authenticated. Therefore, we will always have access too res.oidc.user at this point. A conditional check is redundant here.
    // Isolate the ID portion from the authentication type (e.g. auth0|1234 -> 1234)
    let userId: undefined | string;

    // For testing purposes, use the res.locals object, which can be changed to suit testing needs
    if (process.env.TEST_ENV === 'true') {
      userId = res.locals.user!.sub.split('|')[1] as string
      console.log('Testing', userId);
    } else {
      userId = req.oidc.user!.sub.split('|')[1] as string;
    }

    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Validation errors have occurred. Return these to the user
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());   // Do not throw single error here, pass all validation errors
    } else {

      const newSubscription = await insertSubscription({
        channelId: req.body.channelId,
        userId: userId,
        platform: req.body.platform
      });

      res.status(200).json(newSubscription);   // Return status OK and new subscription to client
    }
  }),
];

// @desc    Delete subscription
// @route   DELETE /api/subscriptions/subscriptionId
// @access  Private
// * Named with 'Controller' suffix to distinguish from database helper function with the same name
const deleteSubscriptionController = asyncHandler(async (req, res) => {
  // subscription ID grabbed from URL params
  const subscriptionId = req.params.subscriptionId;
  const result = await deleteSubscription(subscriptionId);

  // ? Is this typescript addition needlessly complex?
  const subscription: Subscription | undefined = result.rows[0];

  if (!subscription) {    // subscription not found
    res.status(400);
    throw new Error('subscription not found');
  }

  // subscription found in db; return deleted subscription
  res.status(200).json(result.rows[0]);
});

export {
  getSubscription,
  addSubscription,
  deleteSubscriptionController
}
