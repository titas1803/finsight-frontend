import { TransactionType } from "../../constants/enums";
import type { TransactionListResponse } from "../../types/transaction.types";
import { TYPE_CFG } from "./TransactionConfigs";
import { formatCurrency } from "../../utils/format";
import React from "react";

export const TransactionSummary: React.FC<
  Pick<
    TransactionListResponse,
    "totalExpense" | "totalIncome" | "totalInvestment"
  >
> = React.memo((totals) => {
  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:justify-between">
      {(
        [
          {
            key: "totalIncome",
            label: "Income",
            cfg: TYPE_CFG[TransactionType.INCOME],
          },
          {
            key: "totalExpense",
            label: "Expenses",
            cfg: TYPE_CFG[TransactionType.EXPENSE],
          },
          {
            key: "totalInvestment",
            label: "Investments",
            cfg: TYPE_CFG[TransactionType.INVESTMENT],
          },
        ] as const
      ).map(({ key, label, cfg }) => (
        <div
          key={key}
          className={`flex justify-between @max-md:justify-center items-center gap-3 px-4 py-3 rounded-xl border ${cfg.dimBg} border-current/10 overflow-clip lg:w-[32.5%]`}
          style={{ borderColor: cfg.color + "20" }}
        >
          <cfg.Icon size={16} className={cfg.dimText} />
          <div className="flex gap-2">
            <p className="text-xs text-[#64748B]">{label}</p>
            <p className={`text-sm font-bold tabular-nums ${cfg.dimText}`}>
              {formatCurrency(totals[key])}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
});
