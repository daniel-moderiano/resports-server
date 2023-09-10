import { deleteUser, upsertUser } from "../db";
import { Auth0AccessTokenResponse, UserStruct } from "../types";
import {
  createSuccessHttpResponse,
  createErrorHttpResponse,
} from "../utils/apiResponseGenerator";
import axios, { AxiosResponse } from "axios";
import asyncHandler from "express-async-handler";
import { Request } from "express-jwt";
import mongoose from "mongoose";
import { is, omit } from "superstruct";
import "dotenv/config";
import { getUserIdFromRequest } from "../utils/getUserIdFromRequest";

/**
 * Adds a new user to the database. The user data should be contained in the request body.
 * @param req - `express-jwt` request object containing the user data in the body.
 * @param res - Express response object used to send the response.
 */
export const addUserController = asyncHandler(async (req: Request, res) => {
  const userInformation = req.body;

  if (!userInformation) {
    res.status(400).send(createErrorHttpResponse(400, "User data is required"));
  }

  if (!is(userInformation, omit(UserStruct, ["saved_channels"]))) {
    res.status(400).send(createErrorHttpResponse(400, "User data is invalid."));
  }

  const upsertedUser = await upsertUser(userInformation);

  if (upsertedUser) {
    res.status(200).send(createSuccessHttpResponse(200, upsertedUser));
  } else {
    res.status(500).send(createErrorHttpResponse(500, "Failed to add user"));
  }
});

/**
 * Deletes a user in Auth0 using the Auth0 Management API.
 * @param userId - The ID of the user to delete.
 * @returns - Axios Response object containing the result of the API call.
 */
const deleteAuth0User = async (userId: string) => {
  // Get Management API Access Token
  const accessTokenResponse: AxiosResponse<Auth0AccessTokenResponse> =
    await axios.request({
      method: "POST",
      url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: new URLSearchParams({
        grant_type: "client_credentials",
        // FIXME: doesn't seem to respect env types during compilation
        client_id: process.env.AUTH0_CLIENT_ID as string,
        client_secret: process.env.AUTH0_CLIENT_SECRET as string,
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      }),
    });

  const accessToken = accessTokenResponse.data.access_token;

  // Use this access token to make a user delete request to the management API
  // Request will succeed even if the user does not exist in the database (provided ID is in valid format)
  return axios.request({
    method: "DELETE",
    url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

/**
 * Deletes a user by ID both in your MongoDB database and in Auth0.
 * @param req - `express-jwt` request object with the user ID retrieved from the request data.
 * @param res - Express response object used to send the response.
 */
export const deleteUserController = asyncHandler(async (req: Request, res) => {
  const userId = getUserIdFromRequest(req);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedUser = await deleteUser(userId, session);

    if (!deletedUser) {
      throw new Error("Error with mongo user delete operation");
    }

    await deleteAuth0User(userId);

    await session.commitTransaction();
    res.status(200).send(createSuccessHttpResponse(200, null));
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    res.status(500).send(createErrorHttpResponse(500, "Failed to delete user"));
  } finally {
    session.endSession();
  }
});
