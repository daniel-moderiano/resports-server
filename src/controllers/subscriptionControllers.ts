import asyncHandler from 'express-async-handler';
import { deleteSubscription, selectAllFromTable, selectSubscription } from '../db/helpers';

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
const addSubscription = asyncHandler(async (req, res) => {
  res.send('Add sub');
});

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
