// import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";

const config = withMT({
  darkMode: ["selector", '[data-mode="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#FD773D",
      "dark-bg": "#191D24",
      "dark-panel": "#252b36",
      "dark-item": "#2b3342",
      "dark-gray-font": "#9da6b9",
      "light-bg": "#fff",
      "light-panel": "#C8D4EA",
      "light-item": "#fff",
      "light-gray-font": "#60696B",
      orange: "#EAAC33",
      "dark-tooltip-bg": "#394356",
      "light-tooltip-bg": "#C8D4EA",
      blue: "#00A3FF",
      "dark-primary": "#EAAC33",
    },
    extend: {
      backgroundImage: {
        gradient: "linear-gradient(90deg, #FD773D, #EAAC33)",
      },
      borderWidth: {},
    },
  },
  plugins: [],
});
export default config;
