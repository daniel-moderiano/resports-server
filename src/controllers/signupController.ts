import asyncHandler from "express-async-handler";
import { selectAllFromTable } from "../db/generalHelpers";
import { selectChannel } from "../db/channelHelpers";
import { ChannelDbResult } from "../types/databaseTypes";

// @desc    Redirect user to Auth0 sign-up page
// @route   GET /sign-up
// @access  Public
export const signupController = asyncHandler(async (req, res) => {
  res.oidc.login({
    authorizationParams: {
      screen_hint: "signup",
    },
    // This address MUST be provided to avoid infinite redirect loop
    returnTo: "http://localhost:5000",
  });
});
