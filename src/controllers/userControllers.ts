import {
  addSavedChannel,
  deleteSavedChannel,
  deleteUser,
  getSavedChannels,
  upsertUser,
} from "@/db";
import { Auth0AccessTokenResponse, ChannelStruct, UserStruct } from "@/types";
import {
  createSuccessHttpResponse,
  createErrorHttpResponse,
} from "@/utils/apiResponseGenerator";
import axios, { AxiosResponse } from "axios";
import asyncHandler from "express-async-handler";
import { Request } from "express-jwt";
import mongoose from "mongoose";
import { is, object, omit } from "superstruct";
import "dotenv/config";

const SavedChannelRequestStruct = object({
  channel: ChannelStruct,
});

/**
 * Retrieves the user ID from the authentication object of the request.
 *
 * @param request - The Express request object modified by `express-jwt`.
 * @returns - The user ID extracted from the authentication object.
 * @throws - If the user ID cannot be accessed.
 */
const getUserId = (request: Request) => {
  const userId = request.auth?.sub;

  if (!userId) {
    throw new Error("Unable to access user ID");
  }

  return userId;
};

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

export const deleteUserController = asyncHandler(async (req: Request, res) => {
  const userId = getUserId(req);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedUser = await deleteUser(userId, session);

    if (!deletedUser) {
      throw new Error("Error with mongo user delete operation");
    }

    await deleteAuth0User(userId);

    await session.commitTransaction();
    res.status(204).send(createSuccessHttpResponse(204, null));
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    res.status(500).send(createErrorHttpResponse(500, "Failed to delete user"));
  } finally {
    session.endSession();
  }
});

export const getSavedChannelsController = asyncHandler(
  async (req: Request, res) => {
    const userId = getUserId(req);
    console.log(userId);

    const savedChannels = await getSavedChannels(userId);

    if (savedChannels) {
      res.status(200).send(createSuccessHttpResponse(200, savedChannels));
    } else {
      res
        .status(500)
        .send(
          createErrorHttpResponse(500, "Failed to retrieve saved channels.")
        );
    }
  }
);

export const addSavedChannelController = asyncHandler(
  async (req: Request, res) => {
    const userId = getUserId(req);

    if (!req.body) {
      res
        .status(400)
        .send(createErrorHttpResponse(400, "Channel data is missing."));
    }

    if (!is(req.body, SavedChannelRequestStruct)) {
      res
        .status(400)
        .send(createErrorHttpResponse(400, "Invalid channel data."));
    }

    const updatedUser = await addSavedChannel(userId, req.body.channel);

    if (updatedUser) {
      res.status(201).send(createSuccessHttpResponse(201, updatedUser));
    } else {
      res
        .status(500)
        .send(createErrorHttpResponse(500, "Failed to save channel"));
    }
  }
);

export const deleteSavedChannelController = asyncHandler(
  async (req: Request, res) => {
    const userId = getUserId(req);
    const { channelId } = req.params;

    if (!channelId) {
      res
        .status(400)
        .send(createErrorHttpResponse(400, "Channel ID is missing."));
      return;
    }

    await deleteSavedChannel(userId, channelId);

    res.status(204).send(createSuccessHttpResponse(204, null));
  }
);
