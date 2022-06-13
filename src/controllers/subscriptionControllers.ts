import asyncHandler from 'express-async-handler';
import { selectAllFromTable, selectSubscription } from '../db/helpers';

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
  res.send(`Get sub ${req.params.subscriptionId}`)
  // // subscription ID grabbed from URL params
  // const subscriptionId = req.params.subscriptionId;
  // const result = await selectSubscription(subscriptionId);

  // // ? Is this typescript addition needlessly complex?
  // const subscription: subscription | undefined = result.rows[0];

  // if (!subscription) {    // subscription not found
  //   res.status(400);
  //   throw new Error('subscription not found');
  // }

  // // subscription found in db; return subscription details
  // res.status(200).json(subscription);
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
const deleteSubscription = asyncHandler(async (req, res) => {
  res.send(`Delete sub ${req.params.subscriptionId}`)
});

export {
  getSubscription,
  addSubscription,
  deleteSubscription
}
