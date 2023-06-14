/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBlue: "#30A2FF",
        secondSky: "#00C4FF",
        thirdSand: "#FFE7A0",
        fourthYellow: "#FFD966",
        grey: "#041C32",
        menuBackground: "#89CFFD",
      },
    },
  },
  plugins: [],
};
