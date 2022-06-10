import express, { Application, Request, Response, NextFunction } from 'express';
import userRoutes from './routes/userRoutes';
import channelRoutes from './routes/channelRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import getDb from './db/index';
import 'dotenv/config'

process.env.TEST_ENV = 'false';

const app: Application = express();

(async () => {
  const db = getDb();
  await db.connect();
  console.log('Postgres connected');
})();

// Simple index route for testing
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello')
});

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

export default app;