import express from 'express';
const router = express.Router();

// Base path /api/channels

router.get('/', (req, res) => {
  res.send('Channel route')
});

export default router;