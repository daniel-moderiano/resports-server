import express from 'express';
const router = express.Router();
import asyncHandler from 'express-async-handler'

// Base path /api/channels

router.get('/', asyncHandler(async (req, res) => {
  res.send('Channel route')
}));

router.route('/:channelId')
  .get(asyncHandler(async (req, res) => {
    res.send(`Get channel ${req.params.channelId}`)
  }))
  .post(asyncHandler(async (req, res) => {
    res.send(`Add channel ${req.params.channelId}`)
  }))
  .delete(asyncHandler(async (req, res) => {
    res.send(`Delete channel ${req.params.channelId}`)
  }))
  .put(asyncHandler(async (req, res) => {
    res.send(`Update channel ${req.params.channelId}`)
  }));

export default router;