/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkColor: {
          500: '#252329'
        }
      },
      borderWidth: {
        1: '1px'
      },
      minHeight: {
        'screen': ['100vh', '100dvh'],
      }
    },
  },
  plugins: [],
}
