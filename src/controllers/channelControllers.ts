import asyncHandler from 'express-async-handler';
import { selectAllFromTable, selectChannel } from '../db/helpers';

interface ChannelResult {
  channel_id: string;
  channel_name: string;
}

interface ChannelInput {
  channelId: string;
  channelName: string;
}



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
  // Channel ID grabbed from URL params
  const channelId = req.params.channelId;
  const result = await selectChannel(channelId);

  // ? Is this typescript addition needlessly complex?
  const channel: ChannelResult | undefined = result.rows[0];

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
