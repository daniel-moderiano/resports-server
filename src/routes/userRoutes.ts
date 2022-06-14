import express from 'express';
import { requiresAuth } from 'express-openid-connect';
import { getCurrentUser, getUser, updateUser, deleteUser, getUserSubscriptions, getPasswordChange } from '../controllers/userControllers';
const router = express.Router();

// Base path /api/users

router.get('/current', requiresAuth(), getCurrentUser);
router.route('/:userId')
  .get(requiresAuth(), getUser)
  .delete(requiresAuth(), deleteUser)
  .patch(updateUser);

router.route('/:userId/subscriptions').get(getUserSubscriptions);
router.route('/:userId/password-change').get(getPasswordChange);
// router.route('/:userId/email-verification').get(getPasswordChange);


export default router;