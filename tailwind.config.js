/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        regalBlue: "#243c5a",
      },
      screens:{
        'xs':'480px',
      }
    },
  },
  plugins: [],
};
