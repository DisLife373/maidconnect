/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            "light-green": "#E0F2F1",
            "background-color": "#80cbc4",
            "green-darkness": "#00897B",
            "dark-pink": "#E1829B",
         },
      },
      fontSize: {
         "5xl": [
            "3.052rem",
            {
               fontWeight: 1000,
            },
         ],
         "4xl": [
            "2.441rem",
            {
               fontWeight: 900,
            },
         ],
         "3xl": [
            "1.875rem",
            {
               fontWeight: 800,
            },
         ],
         "2-xl": [
            "1.5rem",
            {
               fontWeight: 700,
            },
         ],
         xl: [
            "1.2rem",
            {
               fontWeight: 600,
            },
         ],
         base: [
            "1rem",
            {
               fontWeight: 400,
            },
         ],
         sm: [
            "0.8rem",
            {
               fontWeight: 200,
            },
         ],
         xs: [
            "0.75rem",
            {
               fontWeight: 100,
            },
         ],
         xsm: [
            "0.65rem",
            {
               fontSize: 100,
            },
         ],
      },
      // screens: {
      //    'sm': {'min': '640px', 'max': '767px'},
      //    'md': {'min': '768px', 'max': '1023px'},
      //    'lg': {'min': '1024px', 'max': '1279px'},
      //    'xl': {'min': '1280px', 'max': '1535px'},
      //    '2xl': {'min': '1536px'},
      // },
   },
   variants: {
      extend: {
        textColor: ['responsive'],
        fontSize: ['responsive'],
      },
    },
   plugins: [],
};
