/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Ensure dark mode is enabled with class-based approach
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
