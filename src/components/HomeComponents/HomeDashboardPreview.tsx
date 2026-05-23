import React, { useEffect, useRef, useState } from "react";

const Sparkline: React.FC<{ data: number[]; color: string }> = ({
  data,
  color,
}) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 120,
    h = 40;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * h * 0.85 - 2;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const useCounter = (target: number, duration: number, start: boolean) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
};

export const HomeDashboardPreview: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const income = useCounter(84500, 1800, visible);
  const expense = useCounter(31200, 1800, visible);
  const savings = useCounter(53300, 1800, visible);

  const incomeData = [40, 55, 48, 62, 58, 72, 84];
  const expenseData = [28, 31, 25, 34, 29, 30, 31];

  return (
    <div
      ref={ref}
      className="bg-surface border border-solid border-border rounded-3xl p-7 w-full max-w-120"
    >
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="text-text-muted text-xs tracking-wider uppercase">
            Portfolio Overview
          </div>
          <div className="text-text-primary text-[22px] font-bold font-dm-serif">
            ₹{savings.toLocaleString("en-IN")}
          </div>
        </div>
        <div className="bg-[#22c55e1e] text-income py-1 px-3 text-[12px] font-semibold rounded-[999px]">
          +12.4%
        </div>
      </div>

      {/* Stat rows */}
      {[
        { label: "Income", value: income, color: "#22C55E", data: incomeData },
        {
          label: "Expenses",
          value: expense,
          color: "#EF4444",
          data: expenseData,
        },
      ].map(({ label, value, color, data }) => (
        <div
          key={label}
          className="flex items-center justify-between py-3.5 px-0 border-b border-b-border border-solid"
        >
          <div>
            <div className="text-text-muted text-[11px] mb-0.75 tracking-wider">
              {label}
            </div>
            <div className="text-text-primary text-[18px] font-bold">
              ₹{value.toLocaleString("en-IN")}
            </div>
          </div>
          <Sparkline data={data} color={color} />
        </div>
      ))}

      {/* Category pills */}
      <div className="flex gap-2 mt-4.5 flex-wrap">
        {[
          { label: "Food", pct: 32, color: "#F97316" },
          { label: "Transport", pct: 18, color: "#38BDF8" },
          { label: "Bills", pct: 28, color: "#FBBF24" },
          { label: "Other", pct: 22, color: "#A78BFA" },
        ].map(({ label, pct, color }) => (
          <div
            key={label}
            className="py-1 px-3 text-[12px] rounded-[999px] border border-solid"
            style={{
              background: `${color}18`,
              borderColor: `${color}33`,
              color,
            }}
          >
            {label} <span className="opacity-70">{pct}%</span>
          </div>
        ))}
      </div>

      {/* AI insight strip */}
      <div className="mt-4.5 py-3 px-4 flex items-start gap-2.5 bg-primary/14 border border-solid border-primary/33">
        <div className="w-7 h-7 rounded-lg shrink-0 bg-primary/33 flex items-center justify-center text-primary text-sm">
          ✦
        </div>
        <p className="text-[#94A3B8] text-[12px] leading-[1.6] m-0">
          Your food spending is 18% higher than last month. Consider meal
          prepping to save ₹4,200 monthly.
        </p>
      </div>
    </div>
  );
};
