import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // Legacy keys retain compatibility with saved review themes. See docs/brand-history.
      colors: {
        "brand-blue": "#4563A0",
        "brand-gold": "#85A0D3",
        "brand-brown": "#414758",
        "brand-tan": "#B4DDF6",
        "brand-cream": "#F6F8FC",
        "brand-linen": "#EAF0F9",
        "brand-muted": "#596579",
        "brand-logo": "#5979BC",
        "brand-steel": "#8494AD",
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
