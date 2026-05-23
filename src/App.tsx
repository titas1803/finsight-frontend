import React, { lazy, Suspense } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { RoutePaths } from "./constants/routes";
import { ProtectedRoute } from "./middleware/ProtectedRoute/index.tsx";
import { ToastComp } from "./components/Common/CommonToast/index.tsx";
import { AuthProvider } from "./context/AuthContextProvider.tsx";
import { Loading } from "./components/Common/Loading/index.tsx";

const AuthLayout = lazy(() => import("./layouts/Authlayout/index.tsx"));
const DashboardLayout = lazy(
  () => import("./layouts/DashboardLayout/index.tsx"),
);
const HomePage = lazy(() => import("./pages/home"));
const LoginPage = lazy(() => import("./pages/login"));
const RegisterPage = lazy(() => import("./pages/register"));
const OverviewPage = lazy(() => import("./pages/overview"));
const TransactionsPage = lazy(() => import("./pages/transactions"));
const InsightsPage = lazy(() => import("./pages/insights"));
const ProfilePage = lazy(() => import("./pages/profile"));
const NotFoundPage = lazy(() => import("./pages/notFound"));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastComp />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route>
            <Route element={<AuthLayout />}>
              <Route path={RoutePaths.LOGIN} element={<LoginPage />} />
              <Route path={RoutePaths.REGISTER} element={<RegisterPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path={RoutePaths.OVERVIEW} element={<OverviewPage />} />
                <Route
                  path={RoutePaths.TRANSACTIONS}
                  element={<TransactionsPage />}
                />
                <Route path={RoutePaths.INSIGHTS} element={<InsightsPage />} />
                <Route path={RoutePaths.PROFILE} element={<ProfilePage />} />
              </Route>
            </Route>

            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
