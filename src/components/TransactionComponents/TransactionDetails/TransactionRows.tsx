import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { TransactionType } from "../../../constants/enums";
import { useIsMobile } from "../../../hooks/useIsMobile";
import type { Transaction } from "../../../types/transaction.types";
import { capitalize, formatDate } from "../../../utils/format";
import { CAT_COLOR, PAY_ICON, TYPE_CFG } from "../TransactionConfigs";
import { useState } from "react";

type TransactionDetailsProps = {
  transaction: Transaction;
  onEdit: () => void;
  onDelete: () => void;
};

export const TransactionRows: React.FC<TransactionDetailsProps> = ({
  transaction,
  onDelete,
  onEdit,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile } = useIsMobile();

  const cfg = TYPE_CFG[transaction.type];
  const catColor = CAT_COLOR[transaction.category] ?? "#64748B";
  const PayIcon = PAY_ICON[transaction.paymentMode];

  const signedAmount =
    transaction.type === TransactionType.INCOME
      ? `+₹${transaction.amount}`
      : transaction.type === TransactionType.INVESTMENT
        ? `₹${transaction.amount}`
        : `–₹${transaction.amount}`;

  return isMobile ? (
    <tr className="group border-b border-[#2A2D3E] last:border-0 hover:bg-white/[0.018] transition-colors">
      <td className="px-2 py-1.5 lg:px-5 lg:py-3.5">
        <div className="flex items-center gap-3">
          <div
            className="w-5 lg:w-9 h-5 lg:h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 uppercase"
            style={{ background: catColor + "18", color: catColor }}
          >
            {transaction.category.slice(0, 2)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#F1F5F9] max-w-45 lg:max-w-65">
              {transaction.description}
            </p>
            <p className="text-xs text-[#64748B] mt-0.5">
              {capitalize(transaction.category)}
            </p>
          </div>
        </div>
      </td>
      <td className="px-2 lg:px-4 py-1.5 lg:py-3.5 text-right">
        <span
          className="text-sm font-bold tabular-nums"
          style={{ color: cfg.color }}
        >
          {signedAmount}
        </span>
      </td>
      {/* Actions */}
      <td className="px-1 py-1.5">
        <div className="relative flex justify-end">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="p-1.5 rounded-lg text-[#F1F5F9] transition-all opacity-50 group-hover:opacity-100 focus:opacity-100"
          >
            <MoreHorizontal size={15} />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-8 z-20 bg-[#1A1D27] border border-[#2A2D3E] rounded-xl shadow-2xl py-1 min-w-32.5">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onEdit();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[#F1F5F9] hover:bg-white/5 transition-colors"
                >
                  <Pencil size={13} className="text-[#6C63FF]" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={13} />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  ) : (
    <tr className="group border-b border-[#2A2D3E] last:border-0 hover:bg-white/[0.018] transition-colors">
      {/* Description + category */}
      <td className="px-5 py-3.5">
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
      </td>

      {/* Type badge */}
      <td className="px-4 py-3.5 hidden lg:table-cell">
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold ${cfg.dimBg} ${cfg.dimText}`}
        >
          <cfg.Icon size={11} />
          {cfg.label}
        </span>
      </td>

      {/* Amount */}
      <td className="px-4 py-3.5 text-right">
        <span
          className="text-sm font-bold tabular-nums"
          style={{ color: cfg.color }}
        >
          {signedAmount}
        </span>
      </td>

      {/* Payment mode */}
      <td className="px-4 py-3.5 hidden md:table-cell">
        <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
          <PayIcon size={13} />
          {capitalize(transaction.paymentMode)}
        </div>
      </td>

      {/* Date */}
      <td className="px-4 py-3.5 hidden sm:table-cell">
        <span className="text-xs text-[#64748B]">
          {formatDate(transaction.date)}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3.5 hidden md:table-cell">
        <div className="relative flex justify-end">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="p-1.5 rounded-lg text-[#F1F5F9] lg:text-[#64748B] hover:text-[#F1F5F9] hover:bg-white/5 transition-all opacity: 100 lg:opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <MoreHorizontal size={15} />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-8 z-20 bg-[#1A1D27] border border-[#2A2D3E] rounded-xl shadow-2xl py-1 min-w-32.5">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onEdit();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[#F1F5F9] hover:bg-white/5 transition-colors"
                >
                  <Pencil size={13} className="text-[#6C63FF]" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={13} />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
