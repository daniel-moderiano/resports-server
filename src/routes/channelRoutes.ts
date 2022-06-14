import express from 'express';
const router = express.Router();
import { getAllChannels, getChannel } from '../controllers/channelControllers'
import { requiresAuth } from 'express-openid-connect';

// Base path /api/channels

router.get('/', getAllChannels);

router.get('/:channelId', requiresAuth(), getChannel)

export default router;