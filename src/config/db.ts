import pg from 'pg';
import { config } from 'dotenv';

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_USER,
  database: process.env.DB_USER,
  password: process.env.DB_USER,
  port: process.env.DB_PORT
});

export default pool;