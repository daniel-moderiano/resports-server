import asyncHandler from 'express-async-handler';
import fetch from 'cross-fetch';
import { APIToken, APITokenError } from '../types/APITypes';

// Use this middleware on any route that is making requests to the Auth0 management API. It will request a new JWT before attempting to call the API, so you can be sure you're always making requests with a valid JWT (otherwise tokens will expire in 24 hours)
export const getAccessToken = asyncHandler(async (req, res, next) => {
  // * These IDs/secrets are NOT the same as the Resports app credentials used elsewhere
  const payload = {
    client_id: process.env.API_CLIENT_ID,
    client_secret: process.env.API_CLIENT_SECRET,
    audience: `${process.env.ISSUER}/api/v2/`,
    grant_type: 'client_credentials'
  }

  const response = await fetch(`${process.env.ISSUER}/oauth/token`, {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (response.status !== 200) {    // error with request
    const error: APITokenError = await response.json();
    res.status(response.status);
    throw new Error(error.error_description)
  }

  // Successful request. Extract token from response payload and attach to res.locals for easy access
  const data: APIToken = await response.json()
  res.locals.apiToken = data.access_token;

  next();
});