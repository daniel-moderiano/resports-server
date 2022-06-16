import asyncHandler from 'express-async-handler';
import fetch from 'cross-fetch';
import { body, validationResult } from 'express-validator';
import { selectUserSubscriptions } from '../db/subscriptionHelpers';
import { Auth0ApiError, Auth0User, RequestOIDCUser } from '../types/APITypes';

// @desc    Return the currently logged in user
// @route   GET /api/users/current
// @access  Private
const getCurrentUser = asyncHandler(async (req, res) => {
  // As a protected route, this function should always have access to req.oidc.user; this check may be redundant
  if (!req.oidc.user) {
    res.status(500)
    throw new Error('An error occurred while fetching user data')
  }

  const userData = req.oidc.user as RequestOIDCUser;
  res.status(200).json(userData);
});


// @desc    Get a user
// @route   GET /api/users/:userId
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  // Call Auth0 API with appropriate Bearer token to grant authorisation (will be on res.locals as a result of getAccessToken middleware)
  const response = await fetch(`${process.env.ISSUER}/api/v2/users/${req.params.userId}`, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${res.locals.apiToken}`,
    },
  });

  if (response.status !== 200) {    // error occurred with API request
    const error: Auth0ApiError = await response.json();
    res.status(error.statusCode);
    throw new Error(error.message)
  }

  // Successful fetch response
  const user: Auth0User = await response.json();
  res.status(200).json(user);
});

// @desc    Update user details
// @route   PUT /api/users/:userId
// @access  Private
const updateUser = [
  // Validate input. Only these details are changeable. These are validated by Auth0 as well so this may be redundant. But this does provide an easier way to give useful error messages
  body('email', 'Email is required').trim().isString().isLength({ min: 1 }),
  body('nickname', 'Nickname is required').trim().isString().isLength({ min: 1 }),

  // Process request after input data has been validated
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Validation errors have occurred. Return these to the user
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());   // Do not throw single error here, pass all validation errors
    }

    const currentUserData = req.oidc.user as RequestOIDCUser;

    // Determine if the user is attempting to change their email address
    const emailChanged = currentUserData.email !== req.body.email;

    const updateDetails = {
      email: req.body.email,
      nickname: req.body.nickname
    }
    // Call Auth0 API with appropriate Bearer token
    const response = await fetch(`${process.env.ISSUER}/api/v2/users/${req.params.userId}`, {
      method: 'patch',
      headers: {
        'Authorization': `Bearer ${res.locals.apiToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateDetails)
    });

    const data = await response.json();

    if (data.error) {   // successful fetch, but either bad request or user does not exist. Throw error
      res.status(data.statusCode);
      throw new Error(data.message)
    }

    // After successful update, resend email verification link if email has been changed
    if (emailChanged) {
      // * Do not bother with error handling here. The update operation has succeeded; this is a side effect only
      await fetch(`${process.env.ISSUER}/api/v2/jobs/verification-email`, {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${res.locals.apiToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: req.params.userId,
          client_id: process.env.CLIENT_ID,
        }),
      });
    }

    res.status(200).json(data);

  }),
];

// @desc    Delete user
// @route   DELETE /api/users/:userId
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  // Call Auth0 API with appropriate Bearer token
  const response = await fetch(`${process.env.ISSUER}/api/v2/users/${req.params.userId}`, {
    method: 'delete',
    headers: {
      'Authorization': `Bearer ${res.locals.apiToken}`,
    },
  });

  if (response.status !== 204) {    // error occurred with API request
    const error: Auth0ApiError = await response.json();
    res.status(error.statusCode);
    throw new Error(error.message)
  }

  // 204 status is returned when the user either does not exist, or has been deleted. Both are considered and handled the same way here. However, 204 status also indicates no content, hence a 200 is used to attach some feedback
  res.status(200).json({ message: 'User deleted' });
});


// @desc    Enable a user to change their password
// @route   GET /api/users/:userId/password-change
// @access  Private
const getPasswordChange = asyncHandler(async (req, res) => {
  // First fetch all user details (specifically to access connection type)
  const getUserResponse = await fetch(`${process.env.ISSUER}/api/v2/users/${req.params.userId}`, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${res.locals.apiToken}`,
    },
  });

  if (getUserResponse.status !== 200) {    // error occurred with API request
    const error: Auth0ApiError = await getUserResponse.json();
    res.status(error.statusCode);
    throw new Error(error.message)
  }

  // Successful fetch response
  const userData: Auth0User = await getUserResponse.json();

  // With user data we are now able to construct POST request to change password
  const passwordChangeResponse = await fetch(`${process.env.ISSUER}/dbconnections/change_password`, {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${res.locals.apiToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      email: userData.email,
      connection: userData.identities[0].connection
    }),
  });

  if (passwordChangeResponse.status !== 200) {    // Issue with email passowrd reset request
    const errorData: { error: string; } = await passwordChangeResponse.json();
    res.status(passwordChangeResponse.status);
    throw new Error(errorData.error);
  }

  // Successful request, inform user with a simple message
  res.json({ message: 'Password reset email sent' })
});


// @desc    Resend a verification email to the user
// @route   GET /api/users/:userId/email-verification
// @access  Private
const getEmailVerification = asyncHandler(async (req, res) => {
  // Make POST request with user data. Note this API endpoint is distinct from the user management API above 
  const response = await fetch(`${process.env.ISSUER}/api/v2/jobs/verification-email`, {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${res.locals.apiToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: req.params.userId,
      client_id: process.env.CLIENT_ID,
    }),
  });

  if (response.status !== 200) {    // error occurred with API request
    const error: Auth0ApiError = await response.json();
    res.status(error.statusCode);
    throw new Error(error.message)
  }

  // Successful API call. No content really required here, so a simple JSON message is provided
  res.json({ message: 'Email verification link sent' })
});

// @desc    Get user subscriptions
// @route   GET /api/user/:userId/subscriptions
// @access  Private
const getUserSubscriptions = asyncHandler(async (req, res) => {
  const result = await selectUserSubscriptions(req.params.userId);
  res.json(result.rows);
});

export {
  getCurrentUser,
  getUser,
  updateUser,
  deleteUser,
  getUserSubscriptions,
  getPasswordChange,
  getEmailVerification
}
