import asyncHandler from 'express-async-handler';

// @desc    Get all channels
// @route   GET /api/channels
// @access  Private
const getAllChannels = asyncHandler(async (req, res) => {
  res.send('Channel route');
});


// @desc    Get channel
// @route   GET /api/channels/channelId
// @access  Private
const getChannel = asyncHandler(async (req, res) => {
  res.send('Channel route');
});


// @desc    Add new channel
// @route   POST /api/channels
// @access  Private
const addChannel = asyncHandler(async (req, res) => {
  res.send('Channel route');
});


// @desc    Update channel entry
// @route   PUT /api/channels/channelId
// @access  Private
const updateChannel = asyncHandler(async (req, res) => {
  res.send('Channel route');
});


// @desc    Delete channel
// @route   DELETE /api/channels/channelId
// @access  Private
const deleteChannel = asyncHandler(async (req, res) => {
  res.send('Channel route');
});

