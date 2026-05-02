import { createContext } from "react";
import type { AuthState, LoginResponse } from "../types/auth.types";

export type AuthContextType = AuthState & {
  login: (data: LoginResponse) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
