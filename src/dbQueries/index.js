import pkg from 'pg';
import { DB_PASSWORD, DB_PORT, DB_USER, NODE_ENV } from '../env.js';

const { Pool } = pkg;

const pool = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: NODE_ENV !== 'production' ? 'localhost' : 'abc',
  port: DB_PORT,
  database: 'Nactuz'
});

const query = (text, params) => pool.query(text, params);

export default query;
