import { HomeStatPill } from "./HomeStatPill";

export const HomeStatsBar: React.FC = () => {
  return (
    <section className="py-10 px-6 border-t border-t-[#2A2D3E] border-b border-b-[#2A2D3E] home-stats-bar">
      <div className="max-w-275 my-0 mx-auto flex justify-around gap-5 lg:gap-8">
        <HomeStatPill value="98%" label="Insight accuracy" />
        <div className="w-px bg-border" />
        <HomeStatPill value="8" label="Spending categories" />
        <div className="w-px bg-border" />
        <HomeStatPill value="< 1s" label="AI response time" />
      </div>
    </section>
  );
};
