import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import {
  TrendingUp,
  ChevronRight,
  ChevronLeft,
  ArrowLeftRight,
  LayoutDashboard,
  Sparkles,
  User,
  LogOut,
} from "lucide-react";
import { Nav } from "react-bootstrap";
import { RoutePaths } from "../../../constants/routes";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type SideBarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

const navItems = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    to: RoutePaths.OVERVIEW,
    end: true, // exact match — don't highlight on child routes
  },
  {
    label: "Transactions",
    icon: ArrowLeftRight,
    to: RoutePaths.TRANSACTIONS,
    end: false,
  },
  {
    label: "Insights",
    icon: Sparkles,
    to: RoutePaths.INSIGHTS,
    end: false,
  },
  {
    label: "Profile",
    icon: User,
    to: RoutePaths.PROFILE,
    end: false,
  },
];
export const Sidebar: React.FC<SideBarProps> = ({ collapsed, onToggle }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate(RoutePaths.LOGIN, { replace: true });
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-surface border-r border-border flex flex-col transition-all duration-300 z-40 `}
      style={{ width: collapsed ? "72px" : "240px" }}
    >
      <div className="flex items-center h-16 px-4 border-b border-border shrink-0">
        {/* Icon — always visible */}
        <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shrink-0">
          <TrendingUp size={16} className="text-white" />
        </div>

        {!collapsed && (
          <span className="ml-3 text-text-primary font-bold text-base tracking-tight whitespace-nowrap">
            FinSight
          </span>
        )}

        <button
          onClick={onToggle}
          className="ml-auto p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-background transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      <Nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ end, icon: Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-text-muted hover:text-text-primary hover:bg-background"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`absolute left-0 w-0.5 h-6 rounded-r-full bg-primary transition-opacity duration-150 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                <Icon
                  size={18}
                  className={`shrink-0 transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-text-muted group-hover:text-text-primary"
                  }`}
                />

                {!collapsed && (
                  <span className="whitespace-nowrap">{label}</span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </Nav>

      <div className="px-2 pb-4 border-t border-border pt-4 space-y-1 shrink-0">
        {/* User info — only when expanded */}
        {!collapsed && user && (
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <span className="text-primary text-xs font-bold">
                {user.firstName[0]}
                {user.lastName?.[0] ?? ""}
              </span>
            </div>
            <div className="overflow-hidden">
              <p className="text-text-primary text-xs font-medium truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-text-muted text-xs truncate">{user.email}</p>
            </div>
          </div>
        )}

        {/* Collapsed avatar */}
        {collapsed && user && (
          <div className="flex justify-center mb-1">
            <div
              className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
              title={`${user.firstName} ${user.lastName ?? ""}`}
            >
              <span className="text-primary text-xs font-bold">
                {user.firstName[0]}
                {user.lastName?.[0] ?? ""}
              </span>
            </div>
          </div>
        )}

        {/* Logout button */}
        <button
          onClick={handleLogout}
          title={collapsed ? "Logout" : undefined}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-expense hover:bg-expense/10 transition-all duration-150 group"
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};
