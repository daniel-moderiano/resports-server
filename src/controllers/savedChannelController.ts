import { getSavedChannels, addSavedChannel, deleteSavedChannel } from "../db";
import { ChannelStruct } from "../types";
import {
  createSuccessHttpResponse,
  createErrorHttpResponse,
} from "../utils/apiResponseGenerator";
import { getUserIdFromRequest } from "../utils/getUserIdFromRequest";
import { object, is } from "superstruct";
import asyncHandler from "express-async-handler";
import { Request } from "express-jwt";

const SavedChannelRequestStruct = object({
  channel: ChannelStruct,
});

/**
 * Gets a list of channels saved by a specific user.
 * @param req - `express-jwt` request object with the user ID retrieved from the request data.
 * @param res - Express response object used to send the response.
 */
export const getSavedChannelsController = asyncHandler(
  async (req: Request, res) => {
    const userId = getUserIdFromRequest(req);
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

/**
 * Adds a channel to the user's list of saved channels.
 * @param req - `express-jwt` request object containing the channel data in the body.
 * @param res - Express response object used to send the response.
 */
export const addSavedChannelController = asyncHandler(
  async (req: Request, res) => {
    const userId = getUserIdFromRequest(req);

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

/**
 * Deletes a channel from the user's list of saved channels.
 * @param req - `express-jwt` request object containing the user ID and channel ID in the request data.
 * @param res - Express response object used to send the response.
 */
export const deleteSavedChannelController = asyncHandler(
  async (req: Request, res) => {
    const userId = getUserIdFromRequest(req);
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
