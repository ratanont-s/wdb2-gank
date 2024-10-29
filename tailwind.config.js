/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        primary: {
          700: "#C1CD00",
          DEFAULT: "#DEF81C",
          400: "#DFF547",
          300: "#E5F96E",
          100: "#F6FCC3",
          50: "#FBFFE7",
        },
        secondary: {
          DEFAULT: "#222222",
          700: "#626262",
          500: "#9F9F9F",
          300: "#E1E1E1",
          100: "#F5F5F5",
          50: "#FAFAFA",
        },
        success: "#13CE66",
        info: "#3366FF",
        warning: "#FFB020",
        danger: "#FF000D",
      },
    },
  },
  plugins: [],
};
