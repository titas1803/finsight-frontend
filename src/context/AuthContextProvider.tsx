import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { LoginResponse, User } from "../types/auth.types";
import { getMe, logout as logoutApi } from "../api/auth.api";
import { type AuthContextType, AuthContext } from "./AuthContext";

const storage = () => {
  const storageLocation = localStorage;
  return {
    save: (user: User) => {
      storageLocation.setItem("user", JSON.stringify(user));
    },
    clear: () => {
      storageLocation.removeItem("user");
    },
    restore: (): User | null => {
      try {
        const raw = storageLocation.getItem("user");
        if (!raw) return null;
        return JSON.parse(raw) as User;
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

  const login = useCallback((data: LoginResponse) => {
    storage().save(data.user);
    setUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } finally {
      storage().clear();
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const session = await getMe();
        if (session?.user) {
          storage().save(session.user);
          setUser(session.user);
        } else {
          storage().clear();
          setUser(null);
        }
      } catch {
        // Cookie missing, expired, or invalid — clear stale localStorage user
        storage().clear();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  /**
   * updateUser — called after a successful profile update.
   * Syncs the updated User object into both context state and localStorage
   * so the topbar, avatar, and any other consumer reflect changes immediately
   * without requiring a full page reload or re-login.
   */
  const updateUser = useCallback((updatedUser: User) => {
    storage().save(updatedUser);
    setUser(updatedUser);
  }, []);

  const isAuthenticated = !!user;

  const contextValue = useMemo<AuthContextType>(
    () => ({
      user,
      login,
      logout,
      updateUser,
      isAuthenticated,
      isLoading,
    }),
    [user, login, logout, updateUser, isAuthenticated, isLoading],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
