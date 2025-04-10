/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        tinos: ['Tinos', 'serif'], // Add Tinos font
      },
    },
  },
  plugins: [],
};
