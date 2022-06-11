import express, { Application } from 'express';
import channelRoutes from './routes/channelRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import getDb from './db/index';
import 'dotenv/config';
import { config } from './config/auth0';
import { auth } from 'express-openid-connect';

process.env.TEST_ENV = 'false';

const app: Application = express();

// auth router attaches /login, /logout, and /callback routes to the baseURL
// * Although the form_post notification appears, requests should still be able to be sent fine with HTTP. If issues occur, run the npm https script
app.use(auth(config));

(async () => {
  const db = getDb();
  await db.connect();
  console.log('Postgres connected');
})();

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  if (req.oidc.isAuthenticated() && req.oidc.user) {
    console.log(req.oidc.user);
    console.log(`User ID: ${req.oidc.user.sub.split('|')[1]}`);

    res.send('Logged in')
  } else {
    res.send('Unauthorised, please log in')
  }
});

// Use routes
// app.use('/api/users', userRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Use error handler AFTER all routes are defined above
app.use(errorHandler);

export default app;