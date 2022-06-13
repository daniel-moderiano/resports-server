import express from 'express';
const router = express.Router();
import { getSubscription, addSubscription, deleteSubscription } from '../controllers/subscriptionControllers';
import { requiresAuth } from 'express-openid-connect'

// Base path /api/subscriptions

router.post('/', requiresAuth(), addSubscription)

router.get('/:subscriptionId', requiresAuth(), getSubscription);

router.delete('/:subscriptionId', requiresAuth(), deleteSubscription);

export default router;