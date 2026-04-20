import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        ink: {
          50: "#f6f7f9",
          100: "#eceef2",
          200: "#d5d9e2",
          300: "#b0b8c7",
          400: "#8591a7",
          500: "#67748c",
          600: "#525d73",
          700: "#434c5e",
          800: "#3a4150",
          900: "#0b0f1a",
          950: "#05070d",
        },
        flow: {
          cyan: "#22d3ee",
          teal: "#2dd4bf",
          indigo: "#818cf8",
          violet: "#a78bfa",
          amber: "#fbbf24",
          rose: "#fb7185",
          green: "#4ade80",
        },
      },
      animation: {
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "flow-dash": "flow-dash 2s linear infinite",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "flow-dash": {
          to: { strokeDashoffset: "-20" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
