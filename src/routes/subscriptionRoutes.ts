import express from 'express';
const router = express.Router();
import { getSubscription, getAllSubscriptions, addSubscription, updateSubscription, deleteSubscription } from '../controllers/subscriptionControllers';
import { requiresAuth } from 'express-openid-connect'

// Base path /api/subscriptions

router.get('/', getAllSubscriptions);

router.post('/', addSubscription)

router.route('/:subscriptionId')
  .get(getSubscription)
  .put(updateSubscription)
  .delete(deleteSubscription);

export default router;