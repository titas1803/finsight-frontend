export const AuthUrls = {
  ME: "auth/me",
  REGISTER: "auth/register",
  LOGIN: "auth/login",
  LOGOUT: "auth/logout",
  REFRESHTOKEN: "auth/refresh-tokens",
  UPDATEPASSWORD: "auth/update-password",
};

export const TransactionUrls = {
  CREATE: "transactions/new",
  GETALL: "transactions/all",
  GETSUMMARY: "transactions/summary",
  FINDBYID: (id: string) => `transactions/${id}`,
  FINDBYTYPEANDCATEGORY: (type: TransactionType) =>
    `transactions/${type}/by-category`,
  GETLASTPERIOD: "transactions/last-days",
  UPDATE: (id: string) => `transactions/update/${id}`,
  DELETE: (id: string) => `transactions/delete/${id}`,
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

export const UserUrls = {
  UPDATE: "users/update",
};

export type UserUrls = (typeof UserUrls)[keyof typeof UserUrls];

export const Insighturls = {
  GETINSIGHT: "insights/",
  GETINSIGHTBYCATEGORY: (category: Category) => `insights/category/${category}`,
};

export type Insighturls = (typeof Insighturls)[keyof typeof Insighturls];
