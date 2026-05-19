import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const InsightsEmptyState: React.FC = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 rounded-2xl"
      style={{ background: "#1A1D27", border: "1px dashed #2A2D3E" }}
    >
      <div
        className="p-4 rounded-2xl mb-4"
        style={{ background: "rgba(108,99,255,0.1)" }}
      >
        <PlusCircle size={28} style={{ color: "#6C63FF" }} />
      </div>
      <h3 className="font-semibold mb-1" style={{ color: "#F1F5F9" }}>
        No transactions yet
      </h3>
      <p
        className="text-sm text-center max-w-xs mb-5"
        style={{ color: "#64748B" }}
      >
        Add transactions to unlock AI-powered insights and financial breakdowns
        for this period.
      </p>
      <Link
        to="/dashboard/transactions"
        className="px-5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150"
        style={{ background: "#6C63FF", color: "#fff" }}
      >
        Add Transactions
      </Link>
    </div>
  );
};
