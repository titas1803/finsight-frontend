import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { CircularProgress } from "@mui/material";
import { RoutePaths } from "../../constants/routes";

export const ProtectedRoute = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <CircularProgress aria-label="Loading…" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={RoutePaths.LOGIN}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <Outlet />;
};
