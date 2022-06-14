import express from 'express';
import { requiresAuth } from 'express-openid-connect';
import { getCurrentUser, getUser, updateUser, deleteUser, getUserSubscriptions } from '../controllers/userControllers';
const router = express.Router();

// Base path /api/users

router.get('/current', requiresAuth(), getCurrentUser);
router.route('/:userId')
  .get(getUser)
  .delete(deleteUser)
  .put(updateUser);
router.route('/:userId/subscriptions').get(getUserSubscriptions);


export default router;