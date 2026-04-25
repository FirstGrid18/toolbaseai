/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",
        "primary-dark": "#6D28D9",
        "primary-light": "#EDE9FE",
        dark: "#111827",
        gold: "#F59E0B",
        "gold-light": "#FEF3C7",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 4px rgba(0,0,0,0.06)",
        "card-hover": "0 8px 20px -3px rgba(0,0,0,0.10), 0 3px 6px -4px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
