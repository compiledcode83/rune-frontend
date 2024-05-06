// import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";

const config = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#FD773D",
      dark: "#191D24",
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
