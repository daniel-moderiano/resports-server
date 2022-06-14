import asyncHandler from 'express-async-handler';
import fetch from 'cross-fetch';

// @desc    Return the currently logged in user
// @route   GET /api/users/current
// @access  Private
const getCurrentUser = asyncHandler(async (req, res) => {
  // As a protected route, this function will always have access to req.oidc.user
  const userData = req.oidc.user;
  res.json(userData);
});


// @desc    Get a user
// @route   GET /api/users/:userId
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  // Call Auth0 API with appropriate Bearer token
  const response = await fetch(`${process.env.ISSUER}/api/v2/users/${req.params.userId}`, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${process.env.API_KEY}`,
    },
  });
  const data = await response.json();
  // * This does not expose sensitive data (i.e. password)
  res.json(data);
});

// @desc    Update user details
// @route   PUT /api/users/:userId
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
});

// @desc    Delete user
// @route   DELETE /api/user/:userId
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
});

// @desc    Get user subscriptions
// @route   GET /api/user/:userId/subscriptions
// @access  Private
const getUserSubscriptions = asyncHandler(async (req, res) => {
});

export {
  getCurrentUser,
  getUser,
  updateUser,
  deleteUser,
  getUserSubscriptions
}
