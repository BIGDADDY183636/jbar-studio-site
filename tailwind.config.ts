import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#1a1714",
        "canvas-alt": "#241e1b",
        "canvas-raised": "#2e2722",
        paper: "#ede8de",
        "paper-dim": "#b8b4ac",
        muted: "#8a8680",
        red: "#b04545",
        "red-dark": "#973b3b",
        "red-dim": "#2d1c1c",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
