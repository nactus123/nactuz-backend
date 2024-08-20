const config =
  process.env.NODE_ENV !== 'production' ? await import('dotenv') : null;

if (config) config.config();

export const {
  NODE_ENV,
  DB_USER,
  DB_USER_PROD,
  DB_PASSWORD,
  DB_PASSWORD_PROD,
  DB_PORT,
  DB_PORT_PROD,
  DB_HOST_PROD,
  CRYPTO_KEY,
  INITIALIZATION_VECTOR
} = process.env;
