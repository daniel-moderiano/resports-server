import express, { Application, Request, Response, NextFunction } from 'express';
import getDb from './db/index'

process.env.TEST_ENV = 'false';

const app: Application = express();

const oidc = app.locals.oidc;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello')
});

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