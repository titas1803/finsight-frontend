import { createContext } from "react";
import type { AuthState, LoginResponse, User } from "../types/auth.types";

export type AuthContextType = AuthState & {
  login: (data: LoginResponse) => void;
  logout: () => Promise<void>;
  updateUser: (user: User) => void; // for profile updates — syncs context + localStorage
  isAuthenticated: boolean;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
