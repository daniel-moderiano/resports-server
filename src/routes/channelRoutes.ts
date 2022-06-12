import express from 'express';
const router = express.Router();
import { getAllChannels, getChannel, addChannel, updateChannel, deleteChannel } from '../controllers/channelControllers'

// Base path /api/channels

router.get('/', getAllChannels);

router.post('/', addChannel)

router.route('/:channelId')
  .get(getChannel)
  .put(updateChannel)
  .delete(deleteChannel);

export default router;