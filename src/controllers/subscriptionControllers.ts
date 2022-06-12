import asyncHandler from 'express-async-handler';
import { selectAllFromTable } from '../db/helpers';

interface subscription {
  subscription_id: string;
  subscription_name: string;
}

// @desc    Get all subscriptions
// @route   GET /api/subscriptions
// @access  Private
const getAllSubscriptions = asyncHandler(async (req, res) => {
  const result = await selectAllFromTable('subscriptions');
  res.json(result.rows);
});


// @desc    Get subscription
// @route   GET /api/subscriptions/subscriptionId
// @access  Private
const getSubscription = asyncHandler(async (req, res) => {
  // subscription ID grabbed from URL params
  const subscriptionId = req.params.subscriptionId;
  // const result = await selectsubscription(subscriptionId);

  // ? Is this typescript addition needlessly complex?
  const subscription: subscription | undefined = result.rows[0];

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
  res.send('Add subscription');
});


// @desc    Update subscription entry
// @route   PUT /api/subscriptions/subscriptionId
// @access  Private
const updateSubscription = asyncHandler(async (req, res) => {
  res.send(`Update subscription ${req.params.subscriptionId}`)
});


// @desc    Delete subscription
// @route   DELETE /api/subscriptions/subscriptionId
// @access  Private
const deleteSubscription = asyncHandler(async (req, res) => {
  res.send(`Delete subscription ${req.params.subscriptionId}`)
});

export {
  getAllSubscriptions,
  getSubscription,
  addSubscription,
  updateSubscription,
  deleteSubscription
}
