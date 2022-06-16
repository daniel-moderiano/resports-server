import express from 'express';
import { getAllChannels, getChannel } from '../controllers/channelControllers'
import { requiresAuth } from 'express-openid-connect';

const router = express.Router();

// Base path /api/channels

router.get('/', requiresAuth(), getAllChannels);

router.get('/:channelId', requiresAuth(), getChannel)

export default router;