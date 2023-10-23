import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-background": "#0c0f11",
        paragraph: "#adb4bb",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
        code: ["M PLUS Code Latin", "monospace"],
        poly: ["Playpen Sans", "cursive"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/typography")],
};
export default config;
