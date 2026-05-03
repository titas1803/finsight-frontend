import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { RoutePaths } from "../../constants/routes";
import { Loading } from "../Common/Loading";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Still restoring session — show nothing to avoid flash
  if (isLoading) {
    return <Loading />;
  }

  // Already logged in — send to dashboard
  if (isAuthenticated) {
    return <Navigate to={RoutePaths.OVERVIEW} replace />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* ── Left panel — branding ────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12">
        {/* Layered background */}
        <div className="absolute inset-0 bg-surface" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(ellipse at 20% 50%, #6C63FF22 0%, transparent 60%),
                              radial-gradient(ellipse at 80% 20%, #22C55E11 0%, transparent 50%)`,
          }}
        />

        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(#6C63FF 1px, transparent 1px),
                              linear-gradient(90deg, #6C63FF 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating decorative cards */}
        <div className="absolute top-32 right-8 w-48 h-28 rounded-2xl border border-border bg-background/60 backdrop-blur-sm p-4 rotate-3 shadow-2xl">
          <p className="text-text-muted text-xs mb-1">Total Balance</p>
          <p className="text-text-primary font-bold text-xl">₹2,24,500</p>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-income text-xs">↑ 12.4%</span>
            <span className="text-text-muted text-xs">this month</span>
          </div>
        </div>

        <div className="absolute bottom-48 right-16 w-44 h-24 rounded-2xl border border-border bg-background/60 backdrop-blur-sm p-4 -rotate-2 shadow-2xl">
          <p className="text-text-muted text-xs mb-1">Monthly Savings</p>
          <p className="text-income font-bold text-lg">₹18,200</p>
          <div className="mt-1 w-full bg-border rounded-full h-1">
            <div className="bg-income h-1 rounded-full w-3/4" />
          </div>
        </div>

        <div className="absolute top-1/2 left-8 -translate-y-1/2 w-40 h-20 rounded-2xl border border-border bg-background/60 backdrop-blur-sm p-4 rotate-1 shadow-2xl">
          <p className="text-text-muted text-xs mb-1">AI Insight</p>
          <p className="text-text-primary text-xs leading-relaxed">
            Cut food spend by{" "}
            <span className="text-primary font-semibold">₹2,400</span> this week
          </p>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5z"
                  fill="white"
                  opacity="0.9"
                />
                <path
                  d="M2 17l10 5 10-5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M2 12l10 5 10-5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span
              className="text-text-primary font-bold text-xl tracking-tight"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              FinSight
            </span>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="relative z-10">
          <h2
            className="text-3xl font-bold text-text-primary leading-tight mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Your finances,
            <br />
            <span className="text-primary">intelligently</span> tracked.
          </h2>
          <p className="text-text-muted text-sm leading-relaxed max-w-xs">
            AI-powered insights on your spending, investments, and savings — all
            in one clean dashboard.
          </p>
        </div>
      </div>

      {/* ── Right panel — form ───────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5z"
                  fill="white"
                  opacity="0.9"
                />
                <path
                  d="M2 17l10 5 10-5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M2 12l10 5 10-5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span
              className="text-text-primary font-bold text-lg"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              FinSight
            </span>
          </div>

          {/* Page content (Login or Register form) renders here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
