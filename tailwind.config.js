/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        
        97:"40rem",
        98: "46rem",
      },
      width: {
        97:"40rem",
        98: "50rem",
        100: "70pc",
      },
      fontFamily: {
        HeadBold: ["HeadBold", "sans-serif"],
      },
      
    },
  },
  plugins: [],
};
