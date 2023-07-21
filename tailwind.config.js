/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: { min: "0px", max: "767px" },
        smallPc: { min: "768px", max: "1068px" },
        pc: { min: "1069px" },
      },
      colors: {
        mainBlue: "#30A2FF",
        secondSky: "#00C4FF",
        thirdSand: "#FFE7A0",
        fourthYellow: "#FFD966",
        grey: "#041C32",
        menuBackground: "#89CFFD",
      },
      gridTemplateColumns: {
        indexCard: "repeat(auto-fill, minmax(230px, 1fr))",
      },
      padding: {
        mainPadding: "30px",
      },
      margin: {
        navTop: "95.5px",
      },
    },
  },
  plugins: [],
};
