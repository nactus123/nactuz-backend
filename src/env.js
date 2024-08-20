const config =
  process.env.NODE_ENV !== 'production' ? await import('dotenv') : null;

if (config) config.config();

export const {
  NODE_ENV,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  CRYPTO_KEY,
  INITIALIZATION_VECTOR
} = process.env;
