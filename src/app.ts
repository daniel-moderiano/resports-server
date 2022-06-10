import express, { Application, Request, Response, NextFunction } from 'express';
import userRoutes from './routes/userRoutes';
import channelRoutes from './routes/channelRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import getDb from './db/index';
import 'dotenv/config';
import { auth } from 'express-openid-connect';

process.env.TEST_ENV = 'false';

const app: Application = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

(async () => {
  const db = getDb();
  await db.connect();
  console.log('Postgres connected');
})();

// Simple index route for testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   res.send('Hello')
// });

// req.isAuthenticated is provided from the auth router
app.get('/', (req: Express.Request, res) => {
  console.log(req.oidc.user);
  if (req.oidc.isAuthenticated()) {
    res.send('Logged in')
  } else {
    res.send('Unauthorised, please log in')
  }
});

// Use routes
// app.use('/api/users', userRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

export default app;