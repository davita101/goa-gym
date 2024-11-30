
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan for Tailwind classes in these files
  ],
  theme: {
    container: {
      padding: "1rem",
      center: true,
      screens: {
        "2xl": "1400px", // Limit container width for 2xl breakpoint
      },
    },
    extend: {
      animation: {
        'spin': 'spin 3s linear infinite', // Slow down the spin
      },
      keyframes: {
        border: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],

};
