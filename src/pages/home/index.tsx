import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// ── Animated counter hook ──────────────────────────────────────────────────
function useCounter(target: number, duration: number, start: boolean) {
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
}

// ── Sparkline SVG ─────────────────────────────────────────────────────────
function Sparkline({ data, color }: { data: number[]; color: string }) {
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
}

// ── Mini dashboard card ────────────────────────────────────────────────────
function DashboardPreview() {
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
      style={{
        background: "#1A1D27",
        border: "1px solid #2A2D3E",
        borderRadius: 24,
        padding: 28,
        width: "100%",
        maxWidth: 480,
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <div
            style={{
              color: "#64748B",
              fontSize: 12,
              marginBottom: 4,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Portfolio Overview
          </div>
          <div
            style={{
              color: "#F1F5F9",
              fontSize: 22,
              fontWeight: 700,
              fontFamily: "'DM Serif Display', serif",
            }}
          >
            ₹{savings.toLocaleString("en-IN")}
          </div>
        </div>
        <div
          style={{
            background: "rgba(34,197,94,0.12)",
            color: "#22C55E",
            padding: "4px 12px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
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
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 0",
            borderBottom: "1px solid #2A2D3E",
          }}
        >
          <div>
            <div
              style={{
                color: "#64748B",
                fontSize: 11,
                marginBottom: 3,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {label}
            </div>
            <div style={{ color: "#F1F5F9", fontSize: 18, fontWeight: 700 }}>
              ₹{value.toLocaleString("en-IN")}
            </div>
          </div>
          <Sparkline data={data} color={color} />
        </div>
      ))}

      {/* Category pills */}
      <div style={{ display: "flex", gap: 8, marginTop: 18, flexWrap: "wrap" }}>
        {[
          { label: "Food", pct: 32, color: "#F97316" },
          { label: "Transport", pct: 18, color: "#38BDF8" },
          { label: "Bills", pct: 28, color: "#FBBF24" },
          { label: "Other", pct: 22, color: "#A78BFA" },
        ].map(({ label, pct, color }) => (
          <div
            key={label}
            style={{
              background: `${color}18`,
              border: `1px solid ${color}33`,
              borderRadius: 999,
              padding: "4px 12px",
              fontSize: 12,
              color,
            }}
          >
            {label} <span style={{ opacity: 0.7 }}>{pct}%</span>
          </div>
        ))}
      </div>

      {/* AI insight strip */}
      <div
        style={{
          marginTop: 18,
          background: "rgba(108,99,255,0.08)",
          border: "1px solid rgba(108,99,255,0.2)",
          borderRadius: 12,
          padding: "12px 16px",
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            flexShrink: 0,
            background: "rgba(108,99,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6C63FF",
            fontSize: 14,
          }}
        >
          ✦
        </div>
        <p
          style={{ color: "#94A3B8", fontSize: 12, lineHeight: 1.6, margin: 0 }}
        >
          Your food spending is 18% higher than last month. Consider meal
          prepping to save ₹4,200 monthly.
        </p>
      </div>
    </div>
  );
}

// ── Feature card ──────────────────────────────────────────────────────────
function FeatureCard({
  icon,
  title,
  desc,
  accent,
}: {
  icon: string;
  title: string;
  desc: string;
  accent: string;
}) {
  return (
    <div
      style={{
        background: "#1A1D27",
        border: "1px solid #2A2D3E",
        borderRadius: 20,
        padding: 28,
        transition: "border-color 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = accent + "55";
        (e.currentTarget as HTMLDivElement).style.transform =
          "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#2A2D3E";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: `${accent}18`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          marginBottom: 16,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          color: "#F1F5F9",
          fontSize: 16,
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      <div style={{ color: "#64748B", fontSize: 14, lineHeight: 1.6 }}>
        {desc}
      </div>
    </div>
  );
}

// ── Stat pill ─────────────────────────────────────────────────────────────
function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          color: "#F1F5F9",
          fontSize: 32,
          fontWeight: 800,
          fontFamily: "'DM Serif Display', serif",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div style={{ color: "#64748B", fontSize: 13, marginTop: 6 }}>
        {label}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────
export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        background: "#0F1117",
        minHeight: "100vh",
        color: "#F1F5F9",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Serif+Display&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.4; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        .hero-title { animation: fadeUp 0.7s ease both; }
        .hero-sub   { animation: fadeUp 0.7s 0.15s ease both; }
        .hero-cta   { animation: fadeUp 0.7s 0.3s ease both; }
        .hero-card  { animation: fadeUp 0.9s 0.2s ease both, float 6s 1s ease-in-out infinite; }

        .cta-primary {
          background: #6C63FF; color: #fff; border: none;
          padding: 14px 32px; border-radius: 14px; font-size: 15px;
          font-weight: 600; cursor: pointer; transition: background 0.15s, transform 0.15s;
          font-family: 'DM Sans', sans-serif; text-decoration: none; display: inline-block;
        }
        .cta-primary:hover { background: #5B54E8; transform: translateY(-1px); }

        .cta-secondary {
          background: transparent; color: #94A3B8;
          border: 1px solid #2A2D3E; padding: 14px 32px;
          border-radius: 14px; font-size: 15px; font-weight: 500;
          cursor: pointer; transition: border-color 0.15s, color 0.15s;
          font-family: 'DM Sans', sans-serif; text-decoration: none; display: inline-block;
        }
        .cta-secondary:hover { border-color: #6C63FF; color: #F1F5F9; }

        .nav-link {
          color: #64748B; text-decoration: none; font-size: 14px;
          font-weight: 500; transition: color 0.15s;
        }
        .nav-link:hover { color: #F1F5F9; }
      `}</style>

      {/* ── Navbar ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: scrolled ? "rgba(15,17,23,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid #2A2D3E"
            : "1px solid transparent",
          transition: "all 0.3s",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 9,
                background: "#6C63FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              F
            </div>
            <span
              style={{
                color: "#F1F5F9",
                fontWeight: 700,
                fontSize: 17,
                letterSpacing: "-0.01em",
              }}
            >
              FinSight
            </span>
          </div>

          {/* Nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a href="#features" className="nav-link">
              Features
            </a>
            <a href="#how-it-works" className="nav-link">
              How it works
            </a>
            <Link to="/login" className="nav-link">
              Sign in
            </Link>
            <Link
              to="/register"
              className="cta-primary"
              style={{ padding: "8px 20px", fontSize: 14, borderRadius: 10 }}
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "100px 24px 80px",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(108,99,255,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: 60,
            flexWrap: "wrap",
          }}
        >
          {/* Left */}
          <div style={{ flex: "1 1 420px", maxWidth: 560 }}>
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(108,99,255,0.1)",
                border: "1px solid rgba(108,99,255,0.25)",
                borderRadius: 999,
                padding: "6px 14px",
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#6C63FF",
                  display: "inline-block",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: -3,
                    borderRadius: "50%",
                    border: "1px solid #6C63FF",
                    animation: "pulse-ring 1.5s ease-out infinite",
                  }}
                />
              </span>
              <span style={{ color: "#6C63FF", fontSize: 13, fontWeight: 500 }}>
                AI-powered personal finance
              </span>
            </div>

            <h1
              className="hero-title"
              style={{
                fontSize: "clamp(36px, 5vw, 58px)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                marginBottom: 20,
                fontFamily: "'DM Serif Display', serif",
              }}
            >
              Your money,
              <br />
              <span style={{ color: "#6C63FF" }}>understood.</span>
            </h1>

            <p
              className="hero-sub"
              style={{
                color: "#64748B",
                fontSize: 17,
                lineHeight: 1.7,
                marginBottom: 36,
                maxWidth: 440,
              }}
            >
              FinSight tracks every rupee, analyses your spending patterns, and
              gives you AI-driven insights so you always know where your money
              goes — and where it could go.
            </p>

            <div
              className="hero-cta"
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              <Link to="/register" className="cta-primary">
                Start for free →
              </Link>
              <Link to="/login" className="cta-secondary">
                Sign in
              </Link>
            </div>

            {/* Social proof */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 36,
              }}
            >
              <div style={{ display: "flex" }}>
                {["#6C63FF", "#22C55E", "#F59E0B", "#EF4444"].map((c, i) => (
                  <div
                    key={i}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: c,
                      border: "2px solid #0F1117",
                      marginLeft: i === 0 ? 0 : -8,
                    }}
                  />
                ))}
              </div>
              <span style={{ color: "#64748B", fontSize: 13 }}>
                Join{" "}
                <span style={{ color: "#F1F5F9", fontWeight: 600 }}>
                  2,400+
                </span>{" "}
                users tracking smarter
              </span>
            </div>
          </div>

          {/* Right — dashboard preview */}
          <div
            className="hero-card"
            style={{
              flex: "1 1 380px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section
        style={{
          padding: "40px 24px",
          borderTop: "1px solid #2A2D3E",
          borderBottom: "1px solid #2A2D3E",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: 32,
          }}
        >
          <StatPill value="₹2.4Cr+" label="Transactions tracked" />
          <div style={{ width: 1, background: "#2A2D3E" }} />
          <StatPill value="98%" label="Insight accuracy" />
          <div style={{ width: 1, background: "#2A2D3E" }} />
          <StatPill value="8" label="Spending categories" />
          <div style={{ width: 1, background: "#2A2D3E" }} />
          <StatPill value="< 1s" label="AI response time" />
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div
              style={{
                color: "#6C63FF",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Everything you need
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                fontFamily: "'DM Serif Display', serif",
              }}
            >
              Finance tracking, reimagined
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            <FeatureCard
              icon="📊"
              title="Smart dashboard"
              desc="Get a bird's-eye view of your income, expenses, and investments all in one beautiful overview."
              accent="#6C63FF"
            />
            <FeatureCard
              icon="✦"
              title="AI insights"
              desc="GPT-powered analysis of your spending habits — weekly, monthly, or yearly. Know your patterns before they become problems."
              accent="#A78BFA"
            />
            <FeatureCard
              icon="💸"
              title="Transaction tracking"
              desc="Log income, expenses, and investments with categories. Filter, sort, and search across your full history."
              accent="#22C55E"
            />
            <FeatureCard
              icon="📁"
              title="Category breakdown"
              desc="See exactly where your money goes — food, transport, bills, health, entertainment, and more."
              accent="#F59E0B"
            />
            <FeatureCard
              icon="🔒"
              title="Secure by default"
              desc="JWT auth with httpOnly cookies, token refresh, and rate limiting. Your data stays yours."
              accent="#38BDF8"
            />
            <FeatureCard
              icon="⚡"
              title="Redis-cached insights"
              desc="Instant responses powered by server-side caching. Insights load in milliseconds, not seconds."
              accent="#EF4444"
            />
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section
        id="how-it-works"
        style={{ padding: "80px 24px", borderTop: "1px solid #2A2D3E" }}
      >
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div
              style={{
                color: "#6C63FF",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Simple by design
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                fontFamily: "'DM Serif Display', serif",
              }}
            >
              Up and running in minutes
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              {
                n: "01",
                title: "Create your account",
                desc: "Sign up in under a minute. No credit card, no setup fees — just your email and a strong password.",
                color: "#6C63FF",
              },
              {
                n: "02",
                title: "Log your transactions",
                desc: "Add income, expenses, and investments. Tag them by category — food, transport, bills, salary, and more.",
                color: "#22C55E",
              },
              {
                n: "03",
                title: "Get AI-powered insights",
                desc: "FinSight analyses your data and surfaces actionable insights: where you overspend, where you can save, and how you're trending.",
                color: "#A78BFA",
              },
            ].map(({ n, title, desc, color }, i) => (
              <div
                key={n}
                style={{
                  display: "flex",
                  gap: 28,
                  paddingBottom: i < 2 ? 40 : 0,
                }}
              >
                {/* Step indicator */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      flexShrink: 0,
                      background: `${color}18`,
                      border: `1px solid ${color}44`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color,
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {n}
                  </div>
                  {i < 2 && (
                    <div
                      style={{
                        width: 1,
                        flex: 1,
                        background: "#2A2D3E",
                        marginTop: 8,
                      }}
                    />
                  )}
                </div>
                <div style={{ paddingTop: 10, paddingBottom: 24 }}>
                  <div
                    style={{
                      color: "#F1F5F9",
                      fontSize: 17,
                      fontWeight: 700,
                      marginBottom: 8,
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{ color: "#64748B", fontSize: 14, lineHeight: 1.7 }}
                  >
                    {desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section style={{ padding: "80px 24px" }}>
        <div
          style={{
            maxWidth: 700,
            margin: "0 auto",
            textAlign: "center",
            background: "#1A1D27",
            border: "1px solid #2A2D3E",
            borderRadius: 28,
            padding: "56px 40px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              height: 200,
              background:
                "radial-gradient(ellipse, rgba(108,99,255,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: "#6C63FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                margin: "0 auto 24px",
                fontWeight: 800,
                color: "#fff",
              }}
            >
              F
            </div>
            <h2
              style={{
                fontSize: "clamp(26px, 4vw, 36px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                marginBottom: 14,
                fontFamily: "'DM Serif Display', serif",
              }}
            >
              Take control of your finances
            </h2>
            <p
              style={{
                color: "#64748B",
                fontSize: 15,
                lineHeight: 1.7,
                marginBottom: 32,
                maxWidth: 420,
                margin: "0 auto 32px",
              }}
            >
              Start tracking your money today. Free forever, with AI insights
              that actually help.
            </p>
            <Link
              to="/register"
              className="cta-primary"
              style={{ fontSize: 16, padding: "16px 40px" }}
            >
              Create free account →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid #2A2D3E", padding: "32px 24px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "#6C63FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              F
            </div>
            <span style={{ color: "#64748B", fontSize: 14 }}>
              FinSight — smart finance tracking
            </span>
          </div>
          <div style={{ color: "#64748B", fontSize: 13 }}>
            Built with NestJS · PostgreSQL · Redis · OpenAI
          </div>
        </div>
      </footer>
    </div>
  );
}
