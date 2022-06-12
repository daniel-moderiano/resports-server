import asyncHandler from 'express-async-handler';
import { selectAllFromTable, selectChannel } from '../db/helpers';

interface Channel {
  channel_id: string;
  channel_name: string;
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
  const channel: Channel | undefined = result.rows[0];

  if (!channel) {    // channel not found
    res.status(400);
    throw new Error('channel not found');
  }

  // Channel found in db; return channel details
  res.status(200).json(channel);
});

// @desc    Add new channel
// @route   POST /api/channels
// @access  Private
const addChannel = asyncHandler(async (req, res) => {
  res.send('Add channel');
});


// @desc    Update channel entry
// @route   PUT /api/channels/channelId
// @access  Private
const updateChannel = asyncHandler(async (req, res) => {
  res.send(`Update channel ${req.params.channelId}`)
});


// @desc    Delete channel
// @route   DELETE /api/channels/channelId
// @access  Private
const deleteChannel = asyncHandler(async (req, res) => {
  res.send(`Delete channel ${req.params.channelId}`)
});

export {
  getAllChannels,
  getChannel,
  addChannel,
  updateChannel,
  deleteChannel
}
