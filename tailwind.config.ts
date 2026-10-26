import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // Four opaque colors sampled from the current logo. Legacy keys preserve saved review themes.
      colors: {
        "brand-blue": "#516B9C",
        "brand-gold": "#FEC262",
        "brand-brown": "#363C49",
        "brand-tan": "#FEF5E3",
        "brand-cream": "#FEF5E3",
        "brand-linen": "#FEF5E3",
        "brand-muted": "#363C49",
        "brand-logo": "#363C49",
        "brand-steel": "#516B9C",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
      },
      letterSpacing: { editorial: "0.18em" },
    },
  },
  plugins: [],
} satisfies Config;
