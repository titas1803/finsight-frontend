import { Link } from "react-router-dom";
import { HomeDashboardPreview } from "./HomeDashboardPreview";
import { RoutePaths } from "@/constants/routes";

export const HomeHeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 lg:pt-25 px-6 pb-10 lg:pb-20 home-hero-section">
      {/* Background glow */}
      <div className="absolute top-[20%] left-[50%] w-150 h-100 rounded-[50%] pointer-events-none bg-[radial-gradient(ellipse,rgba(108,99,255,0.12)_0%,transparent_70%)] transform-[translateX(-50%)]" />

      <div className="max-w-275 my-0 mx-auto flex items-center gap-15 flex-wrap">
        {/* Left */}
        <div className="max-w-140 flex-[1_1_420px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/19 border border-solid border-primary/25 rounded-[999px] py-2.5 px-3.5 mb-7">
            <span className="w-1.75 h-1.75 rounded-[50%] bg-primary inline-block relative">
              <span className="absolute -inset-0.75 rounded-[50%] border border-solid border-primary animate-pulse-ring" />
            </span>
            <span className="text-primary text-[13px] font-medium">
              AI-powered personal finance
            </span>
          </div>

          <h1 className="hero-title text-[clamp(36px,5vw,58px)]/[110%] font-extrabold tracking-[-0.03em] mb-5 font-dm-serif animate-hero-title">
            Your money,
            <br />
            <span className="text-primary">understood.</span>
          </h1>

          <p className="hero-sub text-text-muted text-[17px]/[170%] mb-9 max-w-110 animate-hero-sub">
            FinSight tracks every rupee, analyses your spending patterns, and
            gives you AI-driven insights so you always know where your money
            goes — and where it could go.
          </p>

          <div className="hero-cta flex gap-3 flex-wra animate-hero-cta">
            <Link
              to={RoutePaths.REGISTER}
              className="cta-primary bg-primary text-white py-3.5 px-8 rounded-[14px] text-[15px] font-semibold cursor-pointer no-underline inline-block font-dm-sans transition-[background,transform] duration-150 hover:bg-[#5b54e8] hover:-translate-y-px"
            >
              Start for free →
            </Link>
            <Link
              to={RoutePaths.LOGIN}
              className="cta-secondary bg-transparent text-[#94a3b8] border border-solid border-border py-3.5 px-8 rounded-[14px] text-[15px] font-medium curson-pointer font-dm-sans transition-[border-color, color] duration-150 no-underline inline-block hover:border-primary hover:text-text-primary"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Right — dashboard preview */}
        <div className="hero-card flex justify-center flex-[1_1_380px] animate-hero-card">
          <HomeDashboardPreview />
        </div>
      </div>
    </section>
  );
};
