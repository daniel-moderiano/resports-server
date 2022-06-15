import express, { Application } from 'express';
import channelRoutes from './routes/channelRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import getDb from './db/index';
import 'dotenv/config';
import { config } from './config/auth0';
import { auth } from 'express-openid-connect';
import { errorHandler } from './middleware/errorMiddleware';
import userRoutes from './routes/userRoutes';

process.env.TEST_ENV = 'false';

const app: Application = express();

// Allow parsing of form data in req.body for POST and other requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
    res.send('Logged in')
  } else {
    res.send('Unauthorised, please log in')
  }
});

// Ensure a returnTo URL is provided to avoid infinite loops in redirects
app.get('/sign-up', (req, res) => {
  res.oidc.login({
    authorizationParams: {
      screen_hint: 'signup',
    },
    returnTo: 'http://localhost:5000'
  });
});

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Use error handler AFTER all routes are defined above
app.use(errorHandler);

export default app;