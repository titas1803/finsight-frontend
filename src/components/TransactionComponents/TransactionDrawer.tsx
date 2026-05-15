import { X } from "lucide-react";
import type { Transaction } from "../../types/transaction.types";
import { TransactionForm } from "./TransactionForm";

type TransactionDrawerProps = {
  updateData: Transaction | null;
  onClose: () => void;
};
export const TransactionDrawer: React.FC<TransactionDrawerProps> = ({
  updateData,
  onClose,
}) => {
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-105 shadow-2xl flex flex-col border-l border-[#2A2D3E] overflow-hidden mb-0"
        style={{ animation: "slideIn 220ms ease-out" }}
      >
        <div className="flex flex-col h-full bg-[#1A1D27]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2D3E] shrink-0">
            <div>
              <h2 className="text-base font-bold text-[#F1F5F9]">
                {updateData ? "Edit Transaction" : "New Transaction"}
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                {updateData
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
          <TransactionForm onClose={onClose} updateData={updateData} />
        </div>
      </div>
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to   { transform: translateX(0);    opacity: 1; }
          }
        `}
      </style>
    </>
  );
};
