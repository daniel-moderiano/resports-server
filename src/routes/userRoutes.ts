import express from 'express';
import oidc from '../config/oidc';
const router = express.Router();

// Base path /api/users

router.get('/', (req, res) => {
  console.log(oidc);

  res.send('User route')
});

router.post('/login', oidc.ensureAuthenticated(), (req, res) => {
  res.send('Login route')
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