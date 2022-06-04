import express, { Application, Request, Response, NextFunction } from 'express';
import db from './db';

const app: Application = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello')
});

// async/await
(async () => {
  try {
    const { rows } = await db.query('SELECT NOW() as now')
    console.log(rows[0])
  } catch (err) {
    console.log(err)
  }
})();

export default app;