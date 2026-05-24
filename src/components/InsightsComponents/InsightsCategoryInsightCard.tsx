import { Category } from "@/constants/enums";
import { useCategoryInsights } from "@/hooks/insightHooks";
import { BarChart3, AlertCircle } from "lucide-react";
import { useState } from "react";
import { CATEGORY_META, InsightsSkeleton } from ".";
import parse from "html-react-parser";

export const InsightsCategoryInsightPanel: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const { data, isFetching, refetch } = useCategoryInsights(
    selectedCategory ?? Category.OTHER,
  );

  const handleCategoryClick = (cat: Category) => {
    setSelectedCategory(cat);
    refetch();
  };

  return (
    <div
      className="rounded-2xl p-3 mdp-5"
      style={{ background: "#1A1D27", border: "1px solid #2A2D3E" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div
          className="p-1.5 rounded-md"
          style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B" }}
        >
          <BarChart3 size={16} />
        </div>
        <span className="font-semibold text-sm" style={{ color: "#F1F5F9" }}>
          Category Breakdown
        </span>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-8 gap-2 mb-4">
        {Object.values(Category).map((cat) => {
          const meta = CATEGORY_META[cat];
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl transition-all duration-200"
              style={{
                background: isActive ? meta.bg : "rgba(255,255,255,0.03)",
                border: `1px solid ${isActive ? meta.color + "55" : "#2A2D3E"}`,
                color: isActive ? meta.color : "#64748B",
              }}
              // title={meta.label}
            >
              <span style={{ color: isActive ? meta.color : "#64748B" }}>
                {meta.icon}
              </span>
              <span className="text-[10px] font-medium leading-tight text-center">
                {meta.label ?? "label"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Insight Result */}
      {selectedCategory === null ? (
        <div className="flex items-center justify-center py-6 px-3 rounded-xl bg-white/2 border boder-dashed border-border">
          <p className="text-sm" style={{ color: "#64748B" }}>
            Select a category above to see AI insights
          </p>
        </div>
      ) : isFetching ? (
        <div
          className="space-y-2 p-4 rounded-xl"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <InsightsSkeleton className="h-4 w-full" />
          <InsightsSkeleton className="h-4 w-5/6" />
          <InsightsSkeleton className="h-4 w-3/6" />
        </div>
      ) : data ? (
        <div
          className="p-4 rounded-xl"
          style={{
            background: `${CATEGORY_META[selectedCategory].bg}`,
            border: `1px solid ${CATEGORY_META[selectedCategory].color}33`,
          }}
        >
          {data.transactionCount === 0 ? (
            <div className="flex items-center gap-2">
              <AlertCircle size={14} style={{ color: "#64748B" }} />
              <p className="text-sm" style={{ color: "#64748B" }}>
                No transactions found in this category.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: CATEGORY_META[selectedCategory].color }}
                >
                  {CATEGORY_META[selectedCategory].label}
                </span>
                <span className="text-xs" style={{ color: "#64748B" }}>
                  {data.transactionCount} transaction
                  {data.transactionCount !== 1 ? "s" : ""}
                </span>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#94A3B8" }}
              >
                {parse(data.insight)}
              </p>
              {data.stats && (
                <div
                  className="flex flex-wrap gap-3 mt-3 pt-3"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="text-xs" style={{ color: "#64748B" }}>
                    Income:{" "}
                    <span style={{ color: "#22C55E" }}>
                      ₹
                      {parseFloat(data.stats.totalIncome).toLocaleString(
                        "en-IN",
                        { minimumFractionDigits: 2 },
                      )}
                    </span>
                  </span>
                  <span className="text-xs" style={{ color: "#64748B" }}>
                    Expense:{" "}
                    <span style={{ color: "#EF4444" }}>
                      ₹
                      {parseFloat(data.stats.totalExpense).toLocaleString(
                        "en-IN",
                        { minimumFractionDigits: 2 },
                      )}
                    </span>
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};
