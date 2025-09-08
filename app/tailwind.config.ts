import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // ⬅️ critical for next-themes
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
