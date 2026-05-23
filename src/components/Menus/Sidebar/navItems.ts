import { RoutePaths } from "@/constants/routes";
import { LayoutDashboard, ArrowLeftRight, Sparkles, User } from "lucide-react";

export const navItems = [
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
