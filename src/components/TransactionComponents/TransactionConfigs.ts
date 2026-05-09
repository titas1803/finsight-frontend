import {
  TrendingUp,
  TrendingDown,
  Landmark,
  Banknote,
  Smartphone,
  CreditCard,
  Wallet,
} from "lucide-react";
import {
  TransactionType,
  PaymentModes,
  Category,
  ExpenseCategory,
  IncomeCategory,
} from "../../constants/enums";
import type { TransactionFilters } from "../../types/transaction.types";

export const TYPE_CFG = {
  [TransactionType.INCOME]: {
    label: "Income",
    color: "#22C55E",
    dimBg: "bg-emerald-500/10",
    dimText: "text-emerald-400",
    Icon: TrendingUp,
  },
  [TransactionType.EXPENSE]: {
    label: "Expense",
    color: "#EF4444",
    dimBg: "bg-red-500/10",
    dimText: "text-red-400",
    Icon: TrendingDown,
  },
  [TransactionType.INVESTMENT]: {
    label: "Investment",
    color: "#F59E0B",
    dimBg: "bg-amber-500/10",
    dimText: "text-amber-400",
    Icon: Landmark,
  },
} as const;

export const CAT_COLOR: Record<Category, string> = {
  food: "#F59E0B",
  transport: "#6C63FF",
  entertainment: "#EC4899",
  health: "#22C55E",
  shopping: "#F97316",
  bills: "#EF4444",
  salary: "#22C55E",
  other: "#64748B",
};

export const PAY_ICON: Record<PaymentModes, React.ElementType> = {
  [PaymentModes.CASH]: Banknote,
  [PaymentModes.UPI]: Smartphone,
  [PaymentModes.CREDIT_CARD]: CreditCard,
  [PaymentModes.DEBIT_CARD]: CreditCard,
  [PaymentModes.ONLINE_BANKING]: Wallet,
};

export const TRANSACTION_TYPE_CATEGORIES = {
  [TransactionType.EXPENSE]: Object.values(ExpenseCategory),
  [TransactionType.INCOME]: Object.values(IncomeCategory),
  [TransactionType.INVESTMENT]: Object.values(IncomeCategory),
};
export const ALL_CATEGORIES = Object.values(Category);

export const ALL_TYPES = Object.values(TransactionType);
export const ALL_PAYMENT_MODES = Object.values(PaymentModes);
export const EMPTY_FILTERS: TransactionFilters = {};
