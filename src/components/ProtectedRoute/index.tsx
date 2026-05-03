import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { RoutePaths } from "../../constants/routes";
import { Loading } from "../Common/Loading";

export const ProtectedRoute = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <Loading />;
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
