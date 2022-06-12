import asyncHandler from 'express-async-handler';
import { selectAllFromTable } from '../db/helpers';

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
  res.send(`Get channel ${req.params.channelId}`)
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
