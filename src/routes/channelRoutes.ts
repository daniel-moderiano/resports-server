import express from 'express';
const router = express.Router();
import { getAllChannels, getChannel, addChannel, updateChannel, deleteChannel } from '../controllers/channelControllers'
import { requiresAuth } from 'express-openid-connect';

// Base path /api/channels

router.get('/', requiresAuth(), getAllChannels);

router.post('/', requiresAuth(), addChannel)

router.route('/:channelId')
  .get(requiresAuth(), getChannel)
  .put(requiresAuth(), updateChannel)
  .delete(requiresAuth(), deleteChannel);

export default router;