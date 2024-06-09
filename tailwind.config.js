/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'shadows': ['"Shadows Into Light"', 'cursive'], 
      },
    },
  },
  plugins: [],
};
