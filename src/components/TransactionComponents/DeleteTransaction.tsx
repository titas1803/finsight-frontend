import type { Transaction } from "../../types/transaction.types";
import { AlertTriangle } from "lucide-react";
import { TransactionType } from "../../constants/enums";
import { TYPE_CFG, CAT_COLOR } from "./TransactionConfigs";
import { capitalize, formatDate } from "../../utils/format";
import { useDeleteTransaction } from "../../hooks/transactionHooks";

type DeleteTransactionProps = {
  transaction: Transaction;
  onComplete: () => void;
};
export const DeleteTransaction: React.FC<DeleteTransactionProps> = ({
  transaction,
  onComplete,
}) => {
  const cfg = TYPE_CFG[transaction.type];
  const catColor = CAT_COLOR[transaction.category] ?? "#64748B";
  const signedAmount =
    transaction.type === TransactionType.INCOME
      ? `+₹${transaction.amount}`
      : transaction.type === TransactionType.INVESTMENT
        ? `₹${transaction.amount}`
        : `–₹${transaction.amount}`;

  const { mutate: deleteTransactionMutation, isPending } =
    useDeleteTransaction();

  const onConfirm = () => {
    deleteTransactionMutation(transaction.id, {
      onSuccess: () => onComplete(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onComplete}
      />
      <div className="relative bg-[#1A1D27] border border-[#2A2D3E] rounded-2xl p-6 w-full max-w-121 shadow-2xl">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertTriangle size={22} className="text-red-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#F1F5F9]">
              Delete Transaction?
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 uppercase"
                  style={{ background: catColor + "18", color: catColor }}
                >
                  {transaction.category.slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#F1F5F9] truncate max-w-45 lg:max-w-65">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    {capitalize(transaction.category)}
                  </p>
                </div>
              </div>
              <div className="px-4 py-3.5 hidden md:table-cell">
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold ${cfg.dimBg} ${cfg.dimText}`}
                >
                  <cfg.Icon size={11} />
                  {cfg.label}
                </span>
              </div>
              <div className="px-4 py-3.5 text-right">
                <span
                  className="text-sm font-bold tabular-nums"
                  style={{ color: cfg.color }}
                >
                  {signedAmount}
                </span>
              </div>
              <div className="px-4 py-3.5 hidden sm:table-cell">
                <span className="text-xs text-[#64748B]">
                  {formatDate(transaction.date)}
                </span>
              </div>
            </div>
            <p className="text-sm text-[#64748B] mt-1.5">
              Above transaction will be permanently removed. This cannot be
              undone.
            </p>
          </div>
          <div className="flex gap-3 w-full pt-1">
            <button
              onClick={onComplete}
              className="flex-1 py-2.5 rounded-xl border border-[#2A2D3E] text-sm font-medium text-[#64748B] hover:text-[#F1F5F9] hover:border-white/20 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isPending}
              className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-sm font-semibold text-white transition-colors disabled:opacity-50"
            >
              {isPending ? "Deleting…" : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
