import * as jose from 'jose';

import { env } from '@/lib/env';
import { getItem, setItem } from '@/lib/utils/localStorage';

const JWT_SECRET_KEY = 'cosdensolutions';
const jwtSecret = new TextEncoder().encode(JWT_SECRET_KEY);

// Waits for a given number of milliseconds
export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to easily retrieve a database table
export const getDatabaseTable = (entity) => getItem(env.DB_KEY)?.[entity];

export const setDatabaseTable = (entity, data) => {
  const db = getItem(env.DB_KEY);
  db[entity] = data;
  setItem(env.DB_KEY, db);
};

// Removes the password from a user object
export const cleanUser = (user) => {
  const { password, ...rest } = user;
  return rest;
};

// Wrapper for axios mock adapter that adds authentication checks
export const withAuth =
  (...data) =>
  async (config) => {
    const token = config.headers.Authorization?.split(' ')[1];

    // Verifies access token if present
    const verified = token ? await verifyToken(token) : false;

    // Returns 403 if token is invalid and auth is enabled
    if (env.USE_AUTH && !verified) {
      return [401, { message: 'Unauthorized' }];
    }

    // Calls the original mock function
    return typeof data[0] === 'function' ? data[0](config) : data;
  };

// Verifies a JWT token
export const verifyToken = async (token, options = undefined) => {
  try {
    const verification = await jose.jwtVerify(token, jwtSecret);
    return options?.returnPayload ? verification.payload : true;
  } catch {
    return false;
  }
};

// Generates a refresh token with a 30 day expiration
export const generateRefreshToken = async (data) => {
  return await new jose.SignJWT({ data })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(jwtSecret);
};

// Generates an access token with a 15 minute expiration
export const generateAccessToken = async (data) => {
  return await new jose.SignJWT({ data })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('15m')
    .sign(jwtSecret);
};
