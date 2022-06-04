import express, { Application, Request, Response, NextFunction } from 'express';
import db from './db';

const app: Application = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello')
});

// Example db query
(async () => {
  try {
    const res = await db.query("SELECT * FROM users")
    console.log(res.fields)
  } catch (err) {
    console.log(err)
  }
})();

export default app;