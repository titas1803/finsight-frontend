import React, { lazy, Suspense } from "react";
import "./App.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import { RoutePaths } from "./constants/routes";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ToastComp } from "./components/Common/CommonToast/index.tsx";
import { AuthProvider } from "./context/AuthContextProvider.tsx";
import { Loading } from "./components/Common/Loading/index.tsx";
import AuthLayout from "./components/Authlayout/index.tsx";

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
              <Route path={RoutePaths.OVERVIEW} element={<OverviewPage />} />
              <Route
                path={RoutePaths.TRANSACTIONS}
                element={<TransactionsPage />}
              />
              <Route path={RoutePaths.INSIGHTS} element={<InsightsPage />} />
              <Route path={RoutePaths.PROFILE} element={<ProfilePage />} />
            </Route>

            <Route
              path="/"
              element={<Navigate to={RoutePaths.OVERVIEW} replace />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
