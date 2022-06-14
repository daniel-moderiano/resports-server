import express from 'express';
import { getCurrentUser, getUser, updateUser, deleteUser, getUserSubscriptions } from '../controllers/uesrControllers';
const router = express.Router();

// Base path /api/users

router.get('/current', getCurrentUser);
router.route('/:userId')
  .get(getUser)
  .delete(deleteUser)
  .put(updateUser);
router.route('/:userId/subscriptions').get(getUserSubscriptions);


export default router;