import express, { Application, Request, Response, NextFunction } from 'express';
import getDb from './db/index'

process.env.TEST_ENV = 'false';

const app: Application = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello')
});

(async () => {
  try {
    console.log(getDb());
    // await db.connect();
    console.log('DB connected')
  } catch (err) {
    console.log(err)
  }
})();

// ! Call pool.end() on application shutdown. There is no need ot close individual clients when using a pool.

export default app;