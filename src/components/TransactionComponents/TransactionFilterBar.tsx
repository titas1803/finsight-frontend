import React, { useCallback, useEffect, useRef, useState } from "react";
import type { TransactionFilters } from "../../types/transaction.types";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import {
  ALL_CATEGORIES,
  ALL_TYPES,
  TRANSACTION_TYPE_CATEGORIES,
  TYPE_CFG,
} from "./TransactionConfigs";
import type { Category } from "../../constants/enums";
import { capitalize } from "../../utils/format";

type TransactionFilterBarProps = {
  filters: TransactionFilters;
  onChange: (patch: Partial<TransactionFilters>) => void;
  onReset: () => void;
  total: number;
};

export const TransactionFilterBar: React.FC<TransactionFilterBarProps> = ({
  filters,
  onChange,
  onReset,
  total,
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasAdvanced = !!(
    filters.category ||
    filters.startDate ||
    filters.endDate ||
    filters.startAmount ||
    filters.endAmount ||
    filters.sortBy ||
    filters.order
  );
  const hasAny = hasAdvanced || !!filters.type || !!filters.search;

  const [searchInput, setSearchInput] = useState(filters.search ?? "");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      // Update local state immediately — keeps input responsive
      setSearchInput(value);

      // Debounce only the filter update that triggers the API call
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        onChange({ search: value || undefined });
      }, 500);
    },
    [onChange],
  );

  // Sync back if filters are reset externally (Clear button)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchInput(filters.search ?? "");
  }, [filters.search]);

  return (
    <div className="space-y-3">
      {/* Row 1 — search + type pills + advanced toggle */}
      <div className="flex flex-wrap items-center gap-2">
        {/* search */}
        <div className="relative flex-1 min-w-45">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
          />
          <input
            value={searchInput}
            onChange={handleSearch}
            placeholder="Search transactions…"
            className="w-full bg-[#1A1D27] border border-[#2A2D3E] rounded-lg pl-8 pr-3 py-2 text-sm text-[#F1F5F9] placeholder:text-[#64748B] focus:outline-none focus:border-[#6C63FF] transition-colors"
          />
        </div>

        <div className="flex gap-1.5">
          {ALL_TYPES.map((t) => {
            const cfg = TYPE_CFG[t];
            const active = filters.type === t;
            return (
              <button
                key={t}
                onClick={() => onChange({ type: active ? undefined : t })}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all"
                style={
                  active
                    ? {
                        background: cfg.color,
                        borderColor: cfg.color,
                        color: "#fff",
                      }
                    : {
                        background: "#1A1D27",
                        borderColor: "#2A2D3E",
                        color: "#64748B",
                      }
                }
              >
                <cfg.Icon size={12} />
                <span className="hidden sm:inline">{cfg.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setExpanded((v) => !v)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
            hasAdvanced
              ? "border-[#6C63FF] bg-[#6C63FF]/10 text-[#6C63FF]"
              : "border-[#2A2D3E] bg-[#1A1D27] text-[#64748B] hover:text-[#F1F5F9]"
          }`}
        >
          <SlidersHorizontal size={13} />
          Filters
          {hasAdvanced && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF]" />
          )}
          <ChevronDown
            size={13}
            className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </button>

        {hasAny && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-[#64748B] hover:text-red-400 transition-colors"
          >
            <X size={12} />
            Clear
          </button>
        )}

        {total > 0 && (
          <span className="ml-auto text-xs text-[#64748B]">
            {total} result{total !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {expanded && (
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 p-4 bg-[#1A1D27] border border-[#2A2D3E] rounded-xl">
          {/* category */}
          <div className="space-y-1 col-span-1 w-full">
            <label className="text-xs text-[#64748B] font-medium">
              Category
            </label>
            <select
              value={filters.category ?? ""}
              onChange={(e) =>
                onChange({
                  category: (e.target.value as Category) || undefined,
                })
              }
              className="w-full bg-[#0F1117] border border-[#2A2D3E] rounded-lg px-2.5 py-2 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#6C63FF] transition-colors"
            >
              <option value="">All</option>
              {(filters.type
                ? TRANSACTION_TYPE_CATEGORIES[filters.type]
                : ALL_CATEGORIES
              ).map((c) => (
                <option key={c} value={c}>
                  {capitalize(c.replace("_", " "))}
                </option>
              ))}
            </select>
          </div>

          {/* min amount */}
          <div className="space-y-1">
            <label className="text-xs text-[#64748B] font-medium">Min ₹</label>
            <input
              type="number"
              placeholder="0"
              value={filters.startAmount ?? ""}
              onChange={(e) =>
                onChange({ startAmount: e.target.value || undefined })
              }
              className="w-full bg-[#0F1117] border border-[#2A2D3E] rounded-lg px-2.5 py-2 text-sm text-[#F1F5F9] placeholder:text-[#64748B] focus:outline-none focus:border-[#6C63FF] transition-colors"
            />
          </div>

          {/* max amount */}
          <div className="space-y-1">
            <label className="text-xs text-[#64748B] font-medium">Max ₹</label>
            <input
              type="number"
              placeholder="∞"
              value={filters.endAmount ?? ""}
              onChange={(e) =>
                onChange({ endAmount: e.target.value || undefined })
              }
              className="w-full bg-[#0F1117] border border-[#2A2D3E] rounded-lg px-2.5 py-2 text-sm text-[#F1F5F9] placeholder:text-[#64748B] focus:outline-none focus:border-[#6C63FF] transition-colors"
            />
          </div>

          {/* from date */}
          <div className="space-y-1">
            <label className="text-xs text-[#64748B] font-medium">From</label>
            <input
              type="date"
              value={filters.startDate ?? ""}
              onChange={(e) =>
                onChange({ startDate: e.target.value || undefined })
              }
              className="w-full bg-[#0F1117] border border-[#2A2D3E] rounded-lg px-2.5 py-2 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#6C63FF] transition-colors scheme-dark"
            />
          </div>

          {/* to date */}
          <div className="space-y-1">
            <label className="text-xs text-[#64748B] font-medium">To</label>
            <input
              type="date"
              value={filters.endDate ?? ""}
              onChange={(e) =>
                onChange({ endDate: e.target.value || undefined })
              }
              className="w-full bg-[#0F1117] border border-[#2A2D3E] rounded-lg px-2.5 py-2 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#6C63FF] transition-colors scheme-dark"
            />
          </div>

          {/* sort */}
          <div className="space-y-1">
            <label
              className="text-xs text-[#64748B] font-medium"
              htmlFor="filter-sortby"
            >
              Sort
            </label>
            <div className="flex flex-col lg:flex-row gap-1.5">
              <select
                id="filter-sortby"
                value={filters.sortBy ?? ""}
                onChange={(e) =>
                  onChange({
                    sortBy: (e.target.value as "date" | "amount") || undefined,
                  })
                }
                className="flex-1 bg-[#0F1117] border border-[#2A2D3E] rounded-lg px-2 py-2 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#6C63FF] transition-colors"
              >
                <option value="">Default</option>
                <option value="date">Date</option>
                <option value="amount">Amount</option>
              </select>
              <select
                value={filters.order ?? ""}
                onChange={(e) =>
                  onChange({
                    order: (e.target.value as "ASC" | "DESC") || undefined,
                  })
                }
                className="flex-1 bg-[#0F1117] border border-[#2A2D3E] rounded-lg px-2 py-2 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#6C63FF] transition-colors"
              >
                <option value="">—</option>
                <option value="DESC">↓</option>
                <option value="ASC">↑</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
