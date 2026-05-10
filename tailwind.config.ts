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
        canvas: "#0a0908",
        "canvas-alt": "#14100f",
        "canvas-raised": "#1e1916",
        paper: "#f4f1ea",
        "paper-dim": "#b8b4ac",
        muted: "#8a8680",
        red: "#d63031",
        "red-dark": "#b82828",
        "red-dim": "#3d1010",
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
