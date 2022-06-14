import express from 'express';
const router = express.Router();
import { getSubscription, addSubscription, deleteSubscriptionController } from '../controllers/subscriptionControllers';
import { requiresAuth } from 'express-openid-connect'

// Base path /api/subscriptions

router.post('/', requiresAuth(), addSubscription)

router.get('/:subscriptionId', requiresAuth(), getSubscription);

router.delete('/:subscriptionId', requiresAuth(), deleteSubscriptionController);

export default router;