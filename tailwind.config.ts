// tailwind.config.ts
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0F1117", // page background
        surface: "#1A1D27", // cards, sidebar
        border: "#2A2D3E", // dividers
        primary: "#6C63FF", // buttons, active nav
        income: "#22C55E", // income green
        expense: "#EF4444", // expense red
        investment: "#F59E0B", // investment amber
        "text-primary": "#F1F5F9",
        "text-muted": "#64748B",
      },
    },
  },
  plugins: [],
};
