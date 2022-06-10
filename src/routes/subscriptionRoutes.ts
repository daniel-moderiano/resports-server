import express from 'express';
const router = express.Router();

// Base path /api/subscriptions

router.get('/', (req, res) => {
  res.send('Subscription route')
});

export default router;