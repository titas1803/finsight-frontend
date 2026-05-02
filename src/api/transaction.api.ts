import { Category, TransactionType, TransactionUrls } from "../constants/enums";
import {
  type TransactionListResponse,
  type CreateTransactionPayload,
  type CreateTransactionResponse,
  type TransactionFilters,
  type TransactionByIdResponse,
  type UpdateTransactionResponse,
  type UpdateTransactionPayload,
  type DeleteTransactionResponse,
  type LastDaysResponse,
} from "../types/transaction.types";
import api from "./client";

export const createTransaction = async (payload: CreateTransactionPayload) => {
  const { data } = await api.post<CreateTransactionResponse>(
    `/${TransactionUrls.CREATE}`,
    payload,
  );
  return data;
};

export const getAllTransactions = async (filters?: TransactionFilters) => {
  const { data } = await api.get<TransactionListResponse>(
    `/${TransactionUrls.GETALL}`,
    {
      params: filters,
    },
  );

  return data;
};

export const getTransactionById = async (id: string) => {
  const { data } = await api.get<TransactionByIdResponse>(
    `/${TransactionUrls.FINDBYID(id)}`,
  );
  return data;
};

export const updateTransaction = async (
  id: string,
  payload: UpdateTransactionPayload,
) => {
  const { data } = await api.patch<UpdateTransactionResponse>(
    `/${TransactionUrls.UPDATE(id)}`,
    payload,
  );

  return data;
};

export const deleteTransaction = async (id: string) => {
  const { data } = await api.delete<DeleteTransactionResponse>(
    `/${TransactionUrls.DELETE(id)}`,
  );

  return data;
};

export const getTransactionSummary = async (params?: {
  startDate?: string;
  endDate?: string;
}) => {
  const { data } = await api.get(`/${TransactionUrls.GETSUMMARY}`, { params });
  return data;
};

export const getByTypeAndCategory = async (
  type: TransactionType,
  category?: Category,
) => {
  const { data } = await api.get(
    `/${TransactionUrls.FINDBYTYPEANDCATEGORY(type)}`,
    { params: category ? { category } : undefined },
  );

  return data;
};
export const getSpecificPeriod = async (
  period: "week" | "month" | "year" = "week",
) => {
  const { data } = await api.get<LastDaysResponse>(
    `/${TransactionUrls.GETLASTPERIOD}`,
    {
      params: { period },
    },
  );

  return data;
};
