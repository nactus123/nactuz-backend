import pkg from 'pg';
import {
  DB_HOST_PROD,
  DB_PASSWORD,
  DB_PASSWORD_PROD,
  DB_PORT,
  DB_PORT_PROD,
  DB_USER,
  DB_USER_PROD,
  NODE_ENV
} from '../env.js';

const { Pool } = pkg;

const pool = new Pool({
  user: NODE_ENV !== 'production' ? DB_USER : DB_USER_PROD,
  password: NODE_ENV !== 'production' ? DB_PASSWORD : DB_PASSWORD_PROD,
  host: NODE_ENV !== 'production' ? 'localhost' : DB_HOST_PROD,
  port: NODE_ENV !== 'production' ? DB_PORT : DB_PORT_PROD,
  database: NODE_ENV !== 'production' ? 'Nactuz' : 'postgres'
});

const query = (text, params) => pool.query(text, params);

export default query;
