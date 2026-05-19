import { type PeriodTab, PERIODS } from "./insightConstants";

export const InsightsPeriodTabs: React.FC<{
  active: PeriodTab;
  onChange: (p: PeriodTab) => void;
}> = ({ active, onChange }) => {
  return (
    <div
      className="flex items-center gap-1 rounded-xl p-1"
      style={{ background: "#1A1D27", border: "1px solid #2A2D3E" }}
    >
      {PERIODS.map((p) => (
        <button
          key={p.value}
          onClick={() => onChange(p.value)}
          className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          style={{
            background: active === p.value ? "#6C63FF" : "transparent",
            color: active === p.value ? "#fff" : "#64748B",
          }}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
};
