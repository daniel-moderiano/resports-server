import express from 'express';
const router = express.Router();
import asyncHandler from 'express-async-handler'

// Base path /api/users

router.get('/', asyncHandler(async (req, res) => {
  res.send('User route')
}));

router.get('/login', (req, res) => {
  res.send('Protected login route')
});
router.post('/logout', (req, res) => {
  res.send('Logout route')
});
router.post('/register', (req, res) => {
  res.send('Register route')
});
// router.route('/:userId')
//   .get(protectRoute, getUser)
//   .delete(protectRoute, deleteUser)
//   .put(protectRoute, updateUser);

export default router;