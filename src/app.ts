import express, { Application, Request, Response, NextFunction } from 'express';
import './db/utils';
import db from './db';

const app: Application = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello')
});

(async () => {
  try {
    await db.connect();
    console.log('DB connected')
  } catch (err) {
    console.log(err)
  }
})();

export default app;