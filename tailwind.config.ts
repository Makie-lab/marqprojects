import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0A0A0A",
        },
        light: {
          bg: "#FFFFFF",
        },
      },
      borderRadius: {
        glass: "16px",
        "glass-lg": "24px",
      },
    },
  },
  plugins: [],
};

export default config;
