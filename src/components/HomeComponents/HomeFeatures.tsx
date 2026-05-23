import type React from "react";
import { HomeFeatureCard } from "./HomeFeatureCard";

export const HomeFeatures: React.FC = () => {
  return (
    <section id="features" className="py-14 lg:py-24 px-6">
      <div className="max-w-275 my-0 mx-auto">
        <div className="text-center mb-14">
          <div className="text-primary text-[13px] font-semibold tracking-widest uppercase mb-3">
            Everything you need
          </div>
          <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold tracking-[-0.02em] font-dm-serif">
            Finance tracking, reimagined
          </h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
          <HomeFeatureCard
            icon="📊"
            title="Smart dashboard"
            desc="Get a bird's-eye view of your income, expenses, and investments all in one beautiful overview."
            accent="#6C63FF"
          />
          <HomeFeatureCard
            icon="✦"
            title="AI insights"
            desc="GPT-powered analysis of your spending habits — weekly, monthly, or yearly. Know your patterns before they become problems."
            accent="#A78BFA"
          />
          <HomeFeatureCard
            icon="💸"
            title="Transaction tracking"
            desc="Log income, expenses, and investments with categories. Filter, sort, and search across your full history."
            accent="#22C55E"
          />
          <HomeFeatureCard
            icon="📁"
            title="Category breakdown"
            desc="See exactly where your money goes — food, transport, bills, health, entertainment, and more."
            accent="#F59E0B"
          />
          <HomeFeatureCard
            icon="🔒"
            title="Secure by default"
            desc="JWT auth with httpOnly cookies, token refresh, and rate limiting. Your data stays yours."
            accent="#38BDF8"
          />
          <HomeFeatureCard
            icon="⚡"
            title="Redis-cached insights"
            desc="Instant responses powered by server-side caching. Insights load in milliseconds, not seconds."
            accent="#EF4444"
          />
        </div>
      </div>
    </section>
  );
};
