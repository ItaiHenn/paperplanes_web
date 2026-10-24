import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#1A2B5C",
        gold: "#D4AF37",
      },
    },
  },
  plugins: [],
};

export default config;
