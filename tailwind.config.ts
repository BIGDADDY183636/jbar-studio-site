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
        paper: "#f7f5f1",
        "paper-warm": "#f0ede7",
        ink: "#0c0c0a",
        "ink-soft": "#3a3a36",
        "ink-muted": "#6b6b64",
        accent: "#1e3a8a",
        "accent-hover": "#162d6e",
        "accent-light": "#2d4fa8",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.2em",
      },
    },
  },
  plugins: [],
};

export default config;
