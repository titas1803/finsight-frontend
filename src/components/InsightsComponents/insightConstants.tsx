import { Category } from "@/constants/enums";
import type { InsightPeriod } from "@/types/insight.types";
import {
  ShoppingCart,
  Bus,
  Film,
  Heart,
  ShoppingBag,
  Receipt,
  Briefcase,
  MoreHorizontal,
  Earth,
  PiggyBank,
  ChartCandlestick,
  CircleDollarSign,
  Vault,
  FileLock2,
  ShieldCheck,
} from "lucide-react";

export type PeriodTab = InsightPeriod;

export const PERIODS: { label: string; value: PeriodTab }[] = [
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
];

export const CATEGORY_META: Record<
  Category,
  { label: string; icon: React.ReactNode; color: string; bg: string }
> = {
  [Category.FOOD]: {
    label: "Food",
    icon: <ShoppingCart size={16} />,
    color: "#F97316",
    bg: "rgba(249,115,22,0.12)",
  },
  [Category.TRANSPORT]: {
    label: "Transport",
    icon: <Bus size={16} />,
    color: "#38BDF8",
    bg: "rgba(56,189,248,0.12)",
  },
  [Category.ENTERTAINMENT]: {
    label: "Entertainment",
    icon: <Film size={16} />,
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.12)",
  },
  [Category.HEALTH]: {
    label: "Health",
    icon: <Heart size={16} />,
    color: "#34D399",
    bg: "rgba(52,211,153,0.12)",
  },
  [Category.SHOPPING]: {
    label: "Shopping",
    icon: <ShoppingBag size={16} />,
    color: "#F472B6",
    bg: "rgba(244,114,182,0.12)",
  },
  [Category.BILLS]: {
    label: "Bills",
    icon: <Receipt size={16} />,
    color: "#FBBF24",
    bg: "rgba(251,191,36,0.12)",
  },
  [Category.TRAVEL]: {
    label: "Trips and travel",
    icon: <Earth size={16} />,
    color: "#2a9bd4",
    bg: "rgba(34,197,94,0.12)",
  },
  [Category.SALARY]: {
    label: "Salary",
    icon: <Briefcase size={16} />,
    color: "#22C55E",
    bg: "rgba(34,197,94,0.12)",
  },
  [Category.DIVIDEND]: {
    label: "Dividend",
    icon: <Briefcase size={16} />,
    color: "#22C55E",
    bg: "rgba(34,197,94,0.12)",
  },
  [Category.PASSIVE]: {
    label: "Passive Income",
    icon: <PiggyBank size={16} />,
    color: "#fc73c5",
    bg: "rgba(34,197,94,0.12)",
  },
  [Category.STOCKS]: {
    label: "Stocks",
    icon: <ChartCandlestick size={16} />,
    color: "#4dff1c",
    bg: "rgba(34,197,94,0.12)",
  },
  [Category.MUTUAL_FUND]: {
    label: "Mutual fund",
    icon: <CircleDollarSign size={16} />,
    color: "#ecd905",
    bg: "rgba(34,197,94,0.12)",
  },
  [Category.PPF]: {
    label: "PPF",
    icon: <Vault size={16} />,
    color: "#cecece",
    bg: "rgba(34,197,94,0.12)",
  },
  [Category.FD]: {
    label: "Fixed Deposite",
    icon: <FileLock2 size={16} />,
    color: "#f6d935",
    bg: "rgba(34,197,94,0.12)",
  },
  [Category.INSURANCE]: {
    label: "Insurance",
    icon: <ShieldCheck size={16} />,
    color: "#828282da",
    bg: "rgba(34,197,94,0.12)",
  },
  [Category.OTHER]: {
    label: "Other",
    icon: <MoreHorizontal size={16} />,
    color: "#94A3B8",
    bg: "rgba(148,163,184,0.12)",
  },
};
