import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createTransaction } from "../api/transaction.api";
import { queryKeys } from "../constants/queryKeys";
import toast from "react-hot-toast";

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
      toast.success("Transaction added successfully!");
    },
  });

  return { mutate, isPending, error };
};
