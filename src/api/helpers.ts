import type { AxiosRequestConfig } from 'axios';
import * as jose from 'jose';

import { env } from '@/lib/env';
import { getItem, setItem } from '@/lib/utils/localStorage';

import type { Database } from './data/seed';

const JWT_SECRET_KEY = 'cosdensolutions';
const jwtSecret = new TextEncoder().encode(JWT_SECRET_KEY);

// Waits for a given number of milliseconds
export const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to easily retrieve a database table
export const getDatabaseTable = <K extends keyof Database>(
  entity: K
): Database[K] | undefined => getItem<Database>(env.DB_KEY)?.[entity];

export const setDatabaseTable = <K extends keyof Database>(
  entity: K,
  data: Database[K]
): void => {
  const db = getItem<Database>(env.DB_KEY);
  if (db) {
    db[entity] = data;
    setItem(env.DB_KEY, db);
  }
};

// Removes the password from a user object
export const cleanUser = <T extends { password?: string }>(
  user: T
): Omit<T, 'password'> => {
  const { password: _, ...rest } = user;
  return rest;
};

// Use AxiosRequestConfig for mock adapter compatibility
type MockResponse = [number, unknown?];
export type MockHandler = (config: AxiosRequestConfig) => Promise<MockResponse>;

// Wrapper for axios mock adapter that adds authentication checks
export const withAuth =
  (handler: MockHandler | MockResponse): MockHandler =>
  async (config: AxiosRequestConfig): Promise<MockResponse> => {
    const token = config.headers?.Authorization?.toString().split(' ')[1];

    // Verifies access token if present
    const verified = token ? await verifyToken(token) : false;

    // Returns 403 if token is invalid and auth is enabled
    if (env.USE_AUTH && !verified) {
      return [401, { message: 'Unauthorized' }];
    }

    // Calls the original mock function
    return typeof handler === 'function' ? handler(config) : handler;
  };

interface VerifyOptions {
  returnPayload?: boolean;
}

// Verifies a JWT token
export const verifyToken = async (
  token: string,
  options?: VerifyOptions
): Promise<boolean | jose.JWTPayload> => {
  try {
    const verification = await jose.jwtVerify(token, jwtSecret);
    return options?.returnPayload ? verification.payload : true;
  } catch {
    return false;
  }
};

// Generates a refresh token with a 30 day expiration
export const generateRefreshToken = async (data: number): Promise<string> => {
  return await new jose.SignJWT({ data })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(jwtSecret);
};

// Generates an access token with a 15 minute expiration
export const generateAccessToken = async (data: string): Promise<string> => {
  return await new jose.SignJWT({ data })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('15m')
    .sign(jwtSecret);
};

// Extracts user ID from access token
export const getUserIdFromToken = async (
  token: string
): Promise<number | null> => {
  try {
    const accessTokenPayload = await verifyToken(token, { returnPayload: true });
    if (!accessTokenPayload || typeof accessTokenPayload === 'boolean')
      return null;

    const refreshTokenPayload = await verifyToken(
      accessTokenPayload.data as string,
      {
        returnPayload: true,
      }
    );
    if (!refreshTokenPayload || typeof refreshTokenPayload === 'boolean')
      return null;

    return refreshTokenPayload.data as number;
  } catch {
    return null;
  }
};
