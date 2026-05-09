import type {
  Category,
  PaymentModes,
  TransactionType,
} from "../constants/enums";

// Matches your TransactionEntity
export type Transaction = {
  id: string;
  amount: string;
  description?: string;
  category: Category;
  type: TransactionType;
  paymentMode: PaymentModes;
  date: string; // YYYY-MM-DD
  createdAt: string;
};

// POST /transactions request body
export type CreateTransactionPayload = {
  amount: string;
  description?: string;
  category: Category;
  type: TransactionType;
  paymentMode: PaymentModes;
  date: string;
};

// PATCH /transactions/:id request body — all fields optional
export type UpdateTransactionPayload = {
  amount?: string;
  description?: string;
  category?: Category;
  type?: TransactionType;
  paymentMode?: PaymentModes;
  date?: string;
};

// GET /transactions query params
export type TransactionFilters = {
  type?: TransactionType;
  category?: Category;
  paymentMode?: PaymentModes;
  startDate?: string;
  endDate?: string;
  startAmount?: string;
  endAmount?: string;
  search?: string;
  sortBy?: "date" | "amount";
  order?: "ASC" | "DESC";
  limit?: number;
};

// GET /transactions response
export type TransactionListResponse = {
  message: string;
  count: number;
  transactions: Transaction[];
};

// GET /transactions/:id response
export type TransactionByIdResponse = {
  message: string;
  transaction: Transaction;
};

// POST /transactions response
export type CreateTransactionResponse = {
  message: string;
  transaction: Transaction;
};

// PATCH /transactions/:id response
export type UpdateTransactionResponse = {
  message: string;
  count: number;
};

// DELETE /transactions/:id response
export type DeleteTransactionResponse = {
  message: string;
  count: number;
};

// GET /transactions/summary response
export type TransactionSummary = {
  totalIncome: number;
  totalExpense: number;
  totalInvestment: number;
  netBalance: number;
  transactionCount: number;
};

// GET /transactions/type/:type response
export type CategoryBreakdownItem = {
  category: Category;
  total: number;
  percentage: string;
  count: number;
};

// GET /transactions/last-days response
export type LastDaysResponse = {
  message: string;
  count: number;
  transactions: Transaction[];
};
