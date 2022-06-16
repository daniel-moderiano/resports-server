import express from 'express';
import { requiresAuth } from 'express-openid-connect';
import { getCurrentUser, getUser, updateUser, deleteUser, getUserSubscriptions, getPasswordChange, getEmailVerification } from '../controllers/userControllers';
import { getAccessToken } from '../middleware/accessTokenMiddleware';

const router = express.Router();

// Base path /api/users

router.get('/current', requiresAuth(), getCurrentUser);
router.route('/:userId')
  .get(requiresAuth(), getAccessToken, getUser)
  .delete(getAccessToken, deleteUser)
  .patch(requiresAuth(), getAccessToken, updateUser);

router.route('/:userId/subscriptions').get(requiresAuth(), getUserSubscriptions);
router.route('/:userId/password-change').get(requiresAuth(), getAccessToken, getPasswordChange);
router.route('/:userId/email-verification').get(requiresAuth(), getAccessToken, getEmailVerification);


export default router;