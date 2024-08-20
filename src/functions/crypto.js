import crypto from 'crypto';
import { CRYPTO_KEY, INITIALIZATION_VECTOR } from '../env.js';
const secretKey = CRYPTO_KEY;
const iv = INITIALIZATION_VECTOR;
// Function to encrypt a message
export const encrypt = (text) => {
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(secretKey, 'hex'),
    Buffer.from(iv, 'hex')
  );
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

// Function to decrypt an encrypted message
export const decrypt = (encryptedText) => {
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(secretKey, 'hex'),
    Buffer.from(iv, 'hex')
  );
  let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
};
