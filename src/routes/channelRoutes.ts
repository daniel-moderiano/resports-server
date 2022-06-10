import express from 'express';
const router = express.Router();

// Base path /api/channels

router.get('/', (req, res) => {
  res.send('Channel route')
});

// router.post('/login', loginUser);
// router.post('/logout', logoutUser);
// router.post('/register', registerUser);
// router.route('/:userId')
//   .get(protectRoute, getUser)
//   .delete(protectRoute, deleteUser)
//   .put(protectRoute, updateUser);

export default router;