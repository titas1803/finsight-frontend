import type { Transaction } from "../../../types/transaction.types";
import { TransactionRows } from "./TransactionRows";

type TransactionDetailsProps = {
  transactions: Transaction[];
  onEdit: (txn: Transaction) => void;
  onDelete: (txn: Transaction) => void;
};

export const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  onDelete,
  onEdit,
  transactions,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#2A2D3E]">
            <th className="px-3 py-3 lg:px-5 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
              Transaction
            </th>
            <th className="px-3 py-3 lg:px-5 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider hidden lg:table-cell">
              Type
            </th>
            <th className="px-3 py-3 lg:px-5 text-right text-xs font-semibold text-[#64748B] uppercase tracking-wider">
              Amount
            </th>
            <th className="px-3 py-3 lg:px-5 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider hidden md:table-cell">
              Payment
            </th>
            <th className="px-3 py-3 lg:px-5 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider hidden md:table-cell">
              Date
            </th>
            <th className="px-3 py-3 lg:px-5 w-1" />
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <TransactionRows
              key={txn.id}
              transaction={txn}
              onEdit={() => onEdit(txn)}
              onDelete={() => onDelete(txn)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
