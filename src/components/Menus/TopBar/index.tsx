import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RoutePaths } from "../../../constants/routes";
import { useAuth } from "../../../hooks/useAuth";

const toSentenceCase = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getGreeting = (firsName: string): string => {
  const hour = new Date().getHours();

  let greet = "Good evening";

  if (hour < 12) greet = "Good morning";
  if (hour < 17) greet = "Good afternoon";

  const name = toSentenceCase(firsName);

  return `${greet}, ${name} 👋`;
};

const getPageTitle = (pathname: string): string => {
  if (pathname === RoutePaths.OVERVIEW) return "Overview";
  if (pathname === RoutePaths.TRANSACTIONS) return "Transactions";
  if (pathname === RoutePaths.INSIGHTS) return "AI Insights";
  if (pathname === RoutePaths.PROFILE) return "Profile";
  return "FinSight";
};

const formatDate = (): string =>
  new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const TopBar: React.FC = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const isOverview = pathname === RoutePaths.OVERVIEW;

  return (
    <header className="h-16 bg-surface border-b border-border flex items-center px-6 shrink-0 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <div>
          {isOverview && user ? (
            <>
              <h1 className="text-text-primary font-semibold text-base leading-tight">
                {getGreeting(user.firstName)}
              </h1>
              <p className="text-text-muted text-xs">{formatDate()}</p>
            </>
          ) : (
            <h1 className="text-text-primary font-semibold text-base">
              {getPageTitle(pathname)}
            </h1>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          to={RoutePaths.PROFILE}
          className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-background transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <span className="text-primary text-xs font-bold">
              {user?.firstName?.[0]}
              {user?.lastName?.[0] ?? ""}
            </span>
          </div>
          {user && (
            <div className="hidden sm:block text-left">
              <p className="text-text-primary text-xs font-medium leading-tight group-hover:text-primary transition-colors">
                {toSentenceCase(user.firstName)}{" "}
                {user.lastName ? toSentenceCase(user.lastName) : ""}
              </p>
              <p className="text-text-muted text-xs">{user.role}</p>
            </div>
          )}
        </Link>
      </div>
    </header>
  );
};
