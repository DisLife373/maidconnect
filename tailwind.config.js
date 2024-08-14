/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-green': '#E0F2F1',
        'background-color': '#80cbc4',
        'green-darkness': '#00897B',
        'dark-pink': '#E1829B',
      }
    },
    fontSize: {
      '5xl': ['3.052rem', {
        fontWeight: 1000
      }],
      '4xl': ['2.441rem', {
        fontWeight: 800
      }],
      xl: ['1.25rem', {
        fontWeight: 600
      }],
      base: ['1rem', {
        fontWeight: 400
      }],
      sm: ['0.8rem', {
        fontWeight: 200
      }],
    }
  },
  plugins: [],
}

