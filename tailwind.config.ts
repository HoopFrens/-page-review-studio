import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F6F2EC",
        espresso: "#231814",
        terracotta: "#B96D52",
        ink: "#1F1B18",
        bronze: "#B08A57",
        linen: "#EFE7DC",
        stone: "#D8CDC0",
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
