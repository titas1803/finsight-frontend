import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { AuthState, LoginResponse, User } from "../types/auth.types";
import { getMe, logout as logoutApi } from "../api/auth.api";
import { type AuthContextType, AuthContext } from "./AuthContext";

const storage = () => {
  const storageLocation = localStorage;
  return {
    save: (data: { user: User }) => {
      storageLocation.setItem("user", JSON.stringify(data.user));
    },
    clear: () => {
      storageLocation.removeItem("user");
    },

    restore: (): User | null => {
      try {
        const raw = storageLocation.getItem("user");

        if (!raw) return null;

        return JSON.parse(raw);
      } catch {
        storage().clear();
        return null;
      }
    },
  };
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(storage().restore());

  const [isLoading, setIsLoading] = useState(true);

  const updateContextData = useCallback((data: AuthState | null) => {
    setUser(data?.user ?? null);
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

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const session = await getMe();

        if (session?.user) {
          storage().save(session);

          updateContextData(session);
        } else {
          storage().clear();

          updateContextData(null);
        }
      } catch {
        storage().clear();

        updateContextData(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, [updateContextData]);

  const isAuthenticated = !!user;

  const contextValue = useMemo<AuthContextType>(
    () => ({
      user,
      login,
      logout,
      isAuthenticated,
      isLoading,
    }),
    [user, login, logout, isAuthenticated, isLoading],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
