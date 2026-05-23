import { RoutePaths } from "@/constants/routes";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const HomePageMenu: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 py-0 px-6 home-page-menu"
      style={{
        background: scrolled ? "rgba(15,17,23,0.42)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #2A2D3E" : "1px solid transparent",
        transition: "all 0.3s",
      }}
    >
      <div className="max-w-275 my-0 mx-auto h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[9px] bg-primary flex items-center justify-center text-[16px] font-extrabold text-white">
            F
          </div>
          <span className="text-text-primary font-bold text-[17px] tracking-normal">
            FinSight
          </span>
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-8">
          <a href="#features" className="nav-link hidden sm:inline-block">
            Features
          </a>
          <a href="#how-it-works" className="nav-link hidden sm:inline-block">
            How it works
          </a>
          <Link to={RoutePaths.LOGIN} className="nav-link">
            Sign in
          </Link>
          <Link
            to={RoutePaths.REGISTER}
            className="cta-primary py-2 px-5 text-[14px] rounded-[10px] bg-primary text-white font-semibold cursor-pointer no-underline inline-block font-dm-sans transition-[background,transform] duration-150 hover:bg-[#5b54e8] hover:-translate-y-px"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
};
