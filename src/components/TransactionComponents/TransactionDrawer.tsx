import { X } from "lucide-react";
import type { Transaction } from "../../types/transaction.types";

type TransactionDrawerProps = {
  editTransaction?: Transaction;
  onClose: () => void;
};
export const TransactionDrawer: React.FC<TransactionDrawerProps> = ({
  editTransaction,
  onClose,
}) => {
  return (
    <div className="flex flex-col h-full bg-[#1A1D27]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2D3E] shrink-0">
        <div>
          <h2 className="text-base font-bold text-[#F1F5F9]">
            {editTransaction ? "Edit Transaction" : "New Transaction"}
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            {editTransaction
              ? "Update the details below"
              : "Fill in the details below"}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#64748B] hover:text-[#F1F5F9] hover:bg-white/5 transition-colors"
        >
          <X size={17} />
        </button>
      </div>
    </div>
  );
};
