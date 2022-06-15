import asyncHandler from 'express-async-handler';
import { selectAllFromTable } from '../db/generalHelpers';
import { selectChannel } from '../db/channelHelpers';
import { ChannelDbResult } from '../types/databaseTypes';

// @desc    Get all channels
// @route   GET /api/channels
// @access  Private
const getAllChannels = asyncHandler(async (req, res) => {
  const result = await selectAllFromTable('channels');
  res.json(result.rows);
});


// @desc    Get channel
// @route   GET /api/channels/channelId
// @access  Private
const getChannel = asyncHandler(async (req, res) => {
  // Select specified channel from database, and extract the information
  const result = await selectChannel(req.params.channelId);
  const channel: ChannelDbResult | undefined = result.rows[0];

  if (!channel) {    // channel not found
    res.status(400);
    throw new Error('channel not found');
  }

  // Channel found in db; return channel details
  res.status(200).json(channel);
});

export {
  getAllChannels,
  getChannel,
}
