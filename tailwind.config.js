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
        'dark-green': "#286359",
        'dark-pink': '#E1829B',
        'light-pink': '#FFBED7',
      }
    },
    fontSize: {
      '5xl': ['3.052rem', {
        fontWeight: 1000
      }],
      '4xl': ['2.441rem', {
        fontWeight: 900
      }],
      '3xl': ['1.875rem', {
        fontWeight: 800
      }],
      '2xl': ['1.5rem',{
        fontWeight: 700
      }],
      xl: ['1.25rem', {
        fontWeight: 600
      }],
      basexl: ['1.1rem', {
        fontWeight: 500
      }],
      base: ['1rem', {
        fontWeight: 400
      }],
      smbase: ['0.9rem', {
        fontWeight: 300
      }],
      sm: ['0.8rem', {
        fontWeight: 200
      }],
      sx: ['0.7rem', {
        fontWeight: 100
      }],
      ss: ['0.5rem', {
        fontWeight: 50
      }],
    }
  },
  plugins: [],
}

