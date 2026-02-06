import type { CleanUser } from './index';

// Auth response types

export interface AuthResponse {
  accessToken: string | null;
  user: CleanUser | null;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// API error response

export interface ApiErrorResponse {
  message: string;
}

// Token verification options

export interface VerifyTokenOptions {
  returnPayload?: boolean;
}

// JWT payload types

export interface JwtPayload {
  data: string | number;
  exp?: number;
  iat?: number;
}
