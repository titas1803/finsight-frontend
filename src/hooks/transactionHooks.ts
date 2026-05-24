import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  updateTransaction,
} from "../api/transaction.api";
import { queryKeys } from "../constants/queryKeys";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import type {
  TransactionFilters,
  TransactionListResponse,
} from "../types/transaction.types";

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
      toast.success("Transaction added successfully!");
    },
    onError: () => toast.error("Failed to create transaction"),
  });

  return { mutate, isPending, error };
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.insights.all });
      toast.success("Transaction updated successfully!");
    },
    onError: () => toast.error("Failed to update transaction"),
  });

  return { mutate, isPending, error };
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
      toast.success("Transaction deleted successfully!");
    },
    onError: () => toast.error("Failed to delete transaction"),
  });
};

export const useTransactions = (filters?: TransactionFilters) => {
  return useQuery<TransactionListResponse>({
    queryKey: queryKeys.transactions.list(filters),
    queryFn: async () => {
      try {
        return await getAllTransactions(filters);
      } catch (err) {
        if (isAxiosError(err) && err.response?.status === 404) {
          return {
            message: "No transactions found",
            count: 0,
            transactions: [],
            totalExpense: 0,
            totalIncome: 0,
            totalInvestment: 0,
          };
        }
        throw err;
      }
    },
  });
};
