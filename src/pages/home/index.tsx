import {
  HomeCTABanner,
  HomeFeatures,
  HomeFooter,
  HomeHeroSection,
  HomeHowWorks,
  HomeStatsBar,
} from "@/components/HomeComponents";
import { HomePageMenu } from "@/components/Menus/HomePageMenu";

// ── Main page ─────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="bg-background min-h-screen text-text-primary font-dm-sans **:box-border">
      {/* ── Navbar ── */}
      <HomePageMenu />
      {/* ── Hero ── */}
      <HomeHeroSection />
      {/* ── Stats bar ── */}
      <HomeStatsBar />
      {/* ── Features ── */}
      <HomeFeatures />
      {/* ── How it works ── */}
      <HomeHowWorks />
      {/* ── CTA banner ── */}
      <HomeCTABanner />
      {/* ── Footer ── */}
      <HomeFooter />
    </div>
  );
}
