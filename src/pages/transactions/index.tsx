import { useMemo, useState } from "react";
import { Plus, ArrowUpDown } from "lucide-react";
import { useTransactions } from "@/hooks/transactionHooks";
import type {
  TransactionFilters,
  Transaction,
} from "@/types/transaction.types";
import {
  DeleteTransaction,
  TransactionSummary,
  TransactionDetails,
  TransactionDrawer,
  TransactionFilterBar,
} from "@/components/TransactionComponents";

// ─── helpers ──────────────────────────────────────────────────────────────────
const EMPTY_FILTERS: TransactionFilters = { limit: 10 };

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`bg-white/5 rounded-lg animate-pulse ${className ?? ""}`} />
  );
}

function Spinner() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="w-7 h-7 border-2 border-[#6C63FF] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function EmptyState({
  hasFilters,
  onAdd,
}: {
  hasFilters: boolean;
  onAdd: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div className="w-14 h-14 rounded-2xl bg-[#6C63FF]/10 border border-[#6C63FF]/20 flex items-center justify-center">
        <ArrowUpDown size={22} className="text-[#6C63FF]/50" />
      </div>
      <div>
        <p className="text-sm font-semibold text-[#F1F5F9]">
          {hasFilters ? "No matching transactions" : "No transactions yet"}
        </p>
        <p className="text-xs text-[#64748B] mt-1">
          {hasFilters
            ? "Try adjusting or clearing your filters"
            : "Add your first transaction to get started"}
        </p>
      </div>
      {!hasFilters && (
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6C63FF] hover:bg-[#5B54E8] text-sm font-semibold text-white transition-colors"
        >
          <Plus size={14} />
          Add Transaction
        </button>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TransactionsPage() {
  const [filters, setFilters] = useState<TransactionFilters>(EMPTY_FILTERS);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingTxn, setEditingTxn] = useState<Transaction | null>(null);
  const [deletingTxn, setDeletingTxn] = useState<Transaction | null>(null);

  const { data, isLoading, isError } = useTransactions(filters);

  const transactions = data?.transactions ?? [];
  const count = data?.count ?? 0;
  const hasFilters = Object.values(filters).some(
    (v) => v !== undefined && v !== "",
  );

  const pagination: number[] = useMemo(() => {
    const arr = [1];
    if (count > filters.limit!) {
      const totalPages = Math.ceil(count / filters.limit!);
      for (let i = 2; i <= totalPages; i++) {
        arr.push(i);
      }
    }
    return arr;
  }, [count, filters.limit]);

  function openAdd() {
    setEditingTxn(null);
    setDrawerOpen(true);
  }

  function openEdit(t: Transaction) {
    setEditingTxn(t);
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
    setEditingTxn(null);
  }

  function patchFilter(patch: Partial<TransactionFilters>) {
    setFilters((f) => ({ ...f, ...patch }));
  }

  return (
    <div className="p-2 lg:p-6 space-y-5 max-w-300 mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#F1F5F9]">Transactions</h1>
          <p className="text-sm text-[#64748B] mt-0.5">
            Manage and track your financial activity
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6C63FF] hover:bg-[#5B54E8] text-sm font-semibold text-white transition-colors shadow-lg shadow-[#6C63FF]/20 active:scale-95"
        >
          <Plus size={15} />
          <span className="hidden sm:inline">Add Transaction</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Summary strip — only when there are results */}
      {!isLoading && transactions.length > 0 && (
        <TransactionSummary
          totalExpense={data?.totalExpense ?? 0}
          totalIncome={data?.totalIncome ?? 0}
          totalInvestment={data?.totalInvestment ?? 0}
        />
      )}
      {isLoading && (
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-15" />
          ))}
        </div>
      )}

      {/* Filters */}
      <TransactionFilterBar
        filters={filters}
        onChange={patchFilter}
        onReset={() => setFilters(EMPTY_FILTERS)}
        total={count}
      />

      {/* Table card */}
      <div className="bg-[#1A1D27] border border-[#2A2D3E] rounded-2xl overflow-hidden">
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <div className="py-16 text-center text-sm text-[#64748B]">
            Failed to load transactions.{" "}
            <button
              className="text-[#6C63FF] hover:underline"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        ) : transactions.length === 0 ? (
          <EmptyState hasFilters={hasFilters} onAdd={openAdd} />
        ) : (
          <>
            <TransactionDetails
              onDelete={setDeletingTxn}
              onEdit={openEdit}
              transactions={transactions}
            />
            {pagination.length > 1 && (
              <div className="flex justify-center gap-2 py-4">
                {pagination.map((page) => (
                  <button
                    key={page}
                    onClick={() => patchFilter({ pageNo: page })}
                    className="px-3 py-1 rounded-md bg-[#2A2D3E] text-[#F1F5F9] hover:bg-[#3A3D4E] transition-colors"
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Slide-over drawer */}
      {drawerOpen && (
        <TransactionDrawer updateData={editingTxn} onClose={closeDrawer} />
      )}

      {/* Delete confirm */}
      {deletingTxn && (
        <DeleteTransaction
          transaction={deletingTxn}
          onComplete={() => setDeletingTxn(null)}
        />
      )}
    </div>
  );
}
