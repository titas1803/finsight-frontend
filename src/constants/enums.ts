export const AuthUrls = {
  REGISTER: "auth/register",
  LOGIN: "auth/login",
  LOGOUT: "auth/logout",
  REFRESHTOKEN: "auth/refresh-tokens",
  UPDATEPASSWORD: "auth/update-password",
};

export const TransactionUrls = {
  CREATE: "new",
  GETALL: "all",
  GETSUMMARY: "summary",
  FINDBYID: ":id",
  FINDBYTYPEANDCATEGORY: ":type/by-category",
  GETLASTDAYS: "last-days",
  UPDATE: "update/:id",
  DELETE: "delete/:id",
};

export type TransactionUrls =
  (typeof TransactionUrls)[keyof typeof TransactionUrls];

export const TransactionType = {
  INCOME: "income",
  EXPENSE: "expense",
  INVESTMENT: "investment",
};
export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];

export const IncomeCategory = {
  SALARY: "salary",
  DIVIDEND: "dividend",
  INVESTMENT: "investment",
};
export type IncomeCategory =
  (typeof IncomeCategory)[keyof typeof IncomeCategory];

export const InvestmentCategory = {
  STOCKS: "stocks",
  MUTUAL_FUND: "MUTUAL_FUND",
  PPF: "ppf",
  FD: "fd",
  INSURANCE: "insurance",
};
export type InvestmentCategory =
  (typeof InvestmentCategory)[keyof typeof InvestmentCategory];

export const ExpenseCategory = {
  FOOD: "food",
  TRANSPORT: "transport",
  ENTERTAINMENT: "entertainment",
  HEALTH: "health",
  SHOPPING: "shopping",
  BILLS: "bills",
  TRAVEL: "travel",
};

export type ExpenseCategory =
  (typeof ExpenseCategory)[keyof typeof ExpenseCategory];

export const Category = {
  ...IncomeCategory,
  ...InvestmentCategory,
  ...ExpenseCategory,
  OTHER: "other",
};

export type Category = (typeof Category)[keyof typeof Category];

export const PaymentModes = {
  UPI: "upi",
  CREDIT_CARD: "credit-card",
  DEBIT_CARD: "debit-card",
  CASH: "cash",
  ONLINE_BANKING: "online-banking",
};

export type PaymentModes = (typeof PaymentModes)[keyof typeof PaymentModes];

export const UserRole = {
  ADMIN: "ADMIN",
  USER: "USER",
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
