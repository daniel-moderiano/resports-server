import express, { Application, Request, Response, NextFunction } from 'express';
import userRoutes from './routes/userRoutes'

process.env.TEST_ENV = 'false';

const app: Application = express();

const oidc = app.locals.oidc;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello')
});

// Use routes
// app.use('/api/users', postRoutes);
app.use('/api/channels', userRoutes);
// app.use('/api/subscriptions', friendRoutes);


// define a secure route handler for the login page that redirects to /guitars
app.get("/login", oidc.ensureAuthenticated(), (req, res) => {
  res.redirect("/guitars");
});

// define a route to handle logout
app.get("/logout", (req: any, res) => {
  req.logout();
  res.redirect("/");
});

// define a secure route handler for the guitars page
app.get("/guitars", oidc.ensureAuthenticated(), (req: any, res) => {
  res.render("guitars");
});

export default app;