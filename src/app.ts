import 'dotenv/config';
import express, { Application } from 'express';
import channelRoutes from './routes/channelRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import userRoutes from './routes/userRoutes';
import { config } from './config/auth0';
import { auth } from 'express-openid-connect';
import { errorHandler } from './middleware/errorMiddleware';
import { signupController } from './controllers/signupController';

const app: Application = express();

// Allow parsing of form data in req.body for POST and other requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// * Although the form_post warning appears, requests should still be able to be sent fine with HTTP. If issues occur, run the npm https script
// auth router attaches /login, /logout, and /callback routes to the baseURL.
// Sign-up route is manually attached
app.use(auth(config));
app.get('/sign-up', signupController)

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Use error handler AFTER all routes are defined above
app.use(errorHandler);

export default app;