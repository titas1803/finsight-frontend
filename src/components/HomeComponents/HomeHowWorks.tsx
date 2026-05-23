import type React from "react";

export const HomeHowWorks: React.FC = () => {
  return (
    <section
      id="how-it-works"
      className="py-14 lg:py-20 px-6 border-t boder-solid border-border"
    >
      <div className="max-w-195 my-0 mx-auto">
        <div className="text-center mb-14">
          <div className="text-primary text-[13px] font-semibold tracking-widest uppercase mb-3">
            Simple by design
          </div>
          <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold tracking-tight font-dm-serif">
            Up and running in minutes
          </h2>
        </div>

        <div className="flex flex-col gap-0">
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
              className="flex gap-7"
              style={{
                paddingBottom: i < 2 ? 40 : 0,
              }}
            >
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <div
                  className="w-11 h-11 rounded-xl shrink-0 border border-solid flex items-center justify-center text-[13px] font-bold"
                  style={{
                    background: `${color}18`,
                    borderColor: `${color}44`,
                    color,
                  }}
                >
                  {n}
                </div>
                {i < 2 && <div className="bg-boder w-px flex-1 mt-2" />}
              </div>
              <div className="pt-2.5 pb-6">
                <div className="text-text-primary font-bold text-[17px] mb-2">
                  {title}
                </div>
                <div className="text-text-muted text-sm/[170%] ">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
