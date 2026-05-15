import type { UserRole } from "../constants/enums";

export type User = {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  role: UserRole;
  createdAt: string;
  updatedAt?: string;
};

// What AuthContext stores
export type AuthState = {
  user: User | null;
};

// POST /auth/login request body
export type LoginPayload =
  | {
      email: string;
      password: string;
    }
  | {
      phoneNumber: string;
      password: string;
    };

// POST /auth/register request body
export type RegisterPayload = {
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  password: string;
};

// POST /auth/refresh response
export type RefreshTokenResponse = {
  message: string;
};

// POST /auth/refresh request body
export type RefreshTokenPayload = {
  refreshToken: string;
};

// POST /auth/login response
export type LoginResponse = {
  message: string;
  user: User;
};

// POST /auth/register response
export type RegisterResponse = {
  message: string;
};

// PATCH /auth/update-password request body
export type UpdatePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

// Decoded JWT payload shape
export type JwtPayload = {
  userId: string;
  email: string;
  role: UserRole;
  exp: number;
  iat: number;
};

export type UpdateProfilePayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
};

export type UpdateProfileResponse = {
  message: string;
  affected: number;
};
