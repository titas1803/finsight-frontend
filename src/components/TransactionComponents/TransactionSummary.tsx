import { useMemo } from "react";
import { TransactionType } from "../../constants/enums";
import type { Transaction } from "../../types/transaction.types";
import { TYPE_CFG } from "./TransactionConfigs";
import { formatCurrency } from "../../utils/format";

export const SummaryStrip = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const totals = useMemo(() => {
    return transactions.reduce(
      (acc, t) => {
        if (t.type === TransactionType.INCOME) acc.income += Number(t.amount);
        else if (t.type === TransactionType.EXPENSE)
          acc.expense += Number(t.amount);
        else acc.investment += Number(t.amount);
        return acc;
      },
      { income: 0, expense: 0, investment: 0 },
    );
  }, [transactions]);

  return (
    <div className="flex flex-col lg:flex-row gap-3">
      {(
        [
          {
            key: "income",
            label: "Income",
            cfg: TYPE_CFG[TransactionType.INCOME],
          },
          {
            key: "expense",
            label: "Expenses",
            cfg: TYPE_CFG[TransactionType.EXPENSE],
          },
          {
            key: "investment",
            label: "Investments",
            cfg: TYPE_CFG[TransactionType.INVESTMENT],
          },
        ] as const
      ).map(({ key, label, cfg }) => (
        <div
          key={key}
          className={`flex @max-md:justify-center items-center gap-3 px-4 py-3 rounded-xl border ${cfg.dimBg} border-current/10`}
          style={{ borderColor: cfg.color + "20" }}
        >
          <cfg.Icon size={16} className={cfg.dimText} />
          <div className="flex lg:block gap-2">
            <p className="text-xs text-[#64748B]">{label}</p>
            <p className={`text-sm font-bold tabular-nums ${cfg.dimText}`}>
              {formatCurrency(totals[key])}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
