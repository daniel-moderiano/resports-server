import express from 'express';
const router = express.Router();

// Base path /api/users

router.get('/', (req, res) => {
  res.send('Welcome to the users route')
});

// router.post('/login', loginUser);
// router.post('/logout', logoutUser);
// router.post('/register', registerUser);
// router.route('/:userId')
//   .get(protectRoute, getUser)
//   .delete(protectRoute, deleteUser)
//   .put(protectRoute, updateUser);

export default router;