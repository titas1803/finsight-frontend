import { RoutePaths } from "@/constants/routes";
import type React from "react";
import { Link } from "react-router-dom";

export const HomeCTABanner: React.FC = () => {
  return (
    <section className="py-14 lg:py-20 px-6 cta border-t boder-solid border-border">
      <div className="max-w-175 my-0 mx-auto text-center bg-surface border border-solid border-border rounded-[28px] py-10 lg:py-14 px-8 lg:px-10 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-[50%] left-[50%] w-100 h-50 bg-[radial-gradient(ellipse,rgba(108,99,255,0.15)_0%,transparent_70%)] pointer-events-none transform-[translate(-50%,-50%)]" />

        <div className="relative z-1">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-2xl mt-0 mx-auto mb-6 font-extrabold text-white">
            F
          </div>
          <h2 className="text-[clamp(26px,4vw,36px)] font-extrabold tracking-tight mb-3.5 font-dm-serif">
            Take control of your finances
          </h2>
          <p className="text-text-muted text-[15px]/[170%] max-w-105 mt-0 mx-auto mb-8">
            Start tracking your money today. Free forever, with AI insights that
            actually help.
          </p>
          <Link
            to={RoutePaths.REGISTER}
            className="cta-primary text-[16px] py-4 px-10 bg-primary text-white rounded-[14px] font-semibold cursor-pointer no-underline inline-block font-dm-sans transition-[background,transform] duration-150 hover:bg-[#5b54e8] hover:-translate-y-px"
          >
            Create free account →
          </Link>
        </div>
      </div>
    </section>
  );
};
