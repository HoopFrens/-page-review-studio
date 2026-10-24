import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // Legacy keys retain compatibility with saved review themes. See docs/brand-history.
      colors: {
        "brand-blue": "#516A9B",
        "brand-gold": "#FEC262",
        "brand-brown": "#363C48",
        "brand-tan": "#B4DBF5",
        "brand-cream": "#FFF3E1",
        // Quiet alternate surface: 20% official sky blue over 80% official cream.
        "brand-linen": "#F0EEE5",
        "brand-muted": "#363C48",
        "brand-logo": "#516A9B",
        "brand-steel": "#85A0D3",
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
