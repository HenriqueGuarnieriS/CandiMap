/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        missaoCores: {
          missaoBlack: "#fcbf22",
          missaoWhite: "#fcbf22",
          missaoYellow: "#fcbf22",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
