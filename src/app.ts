import express, { Application, Request, Response, NextFunction } from 'express';
import pool from './config/db';

const app: Application = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello')
});

pool.query("DELETE FROM users WHERE id = 1", (err, res) => {
  console.log(err, res);
  pool.end();
});

export default app;