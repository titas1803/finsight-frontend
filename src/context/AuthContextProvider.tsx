import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { AuthState, LoginResponse, User } from "../types/auth.types";
import { logout as logoutApi } from "../api/auth.api";
import { type AuthContextType, AuthContext } from "./AuthContext";

const storage = () => {
  const storageLocation = localStorage;
  return {
    save: (data: LoginResponse) => {
      storageLocation.setItem("accessToken", data.accessToken);
      storageLocation.setItem("refreshToken", data.refreshToken);
      storageLocation.setItem("user", JSON.stringify(data.user));
    },
    clear: () => {
      storageLocation.removeItem("accessToken");
      storageLocation.removeItem("refreshToken");
      storageLocation.removeItem("user");
    },
    restore: (): AuthState | null => {
      try {
        const accessToken = storageLocation.getItem("accessToken");
        const refreshToken = storageLocation.getItem("refreshToken");
        const raw = storageLocation.getItem("user");

        if (!accessToken || !refreshToken || !raw) return null;

        const user: User = JSON.parse(raw);
        return { user, accessToken, refreshToken };
      } catch {
        // Corrupted storage data — clear and start fresh
        storage().clear();
        return null;
      }
    },
  };
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateContextData = useCallback((data: AuthState | null) => {
    setUser(data?.user ?? null);
    setAccessToken(data?.accessToken ?? null);
    setRefreshToken(data?.refreshToken ?? null);
  }, []);

  const login = useCallback(
    (data: LoginResponse) => {
      storage().save(data);
      updateContextData(data);
    },
    [updateContextData],
  );

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } finally {
      storage().clear();
      updateContextData(null);
    }
  }, [updateContextData]);

  const isAuthenticated = useMemo(
    () => !!user && !!accessToken,
    [user, accessToken],
  );

  useEffect(() => {
    const session = storage().restore();
    if (session) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      updateContextData(session);
    }
    setIsLoading(false);
  }, [updateContextData]);

  const contextValue = useMemo<AuthContextType>(
    () => ({
      user,
      accessToken,
      refreshToken,
      login,
      logout,
      isAuthenticated,
      isLoading,
    }),
    [
      accessToken,
      isAuthenticated,
      isLoading,
      login,
      logout,
      refreshToken,
      user,
    ],
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
