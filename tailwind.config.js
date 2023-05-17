/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        '-1': '-1',
      },
      borderWidth: {
        '3': '3px',
      },
      borderRadius: {
        '2lg': '0.66rem',
      },
      boxShadow: {
        'xlb': '0px 25px 40px 0px rgb(0 0 0 / 0%)',
        '2lg': '0 10px 25px 0 rgb(0 0 0)',
        '3lg': '0 10px 25px 0 rgb(0 0 0)',
      },
      colors: {
        'gray-disney-light': 'rgb(48, 50, 62)',
        'gray-disney': 'rgb(30, 31, 42)',
        'disney-footer': '#0e0b14',
        'border-brand': '#41424D',
        'background': 'rgb(26, 29, 41)',
      },
      padding: {
        '5%': '5%',
        '72px': '72px',
      },
      fontSize: {
        '44px': '44px',
        '4.5vw': '10vw',
      },
      minHeight: {
        '100': 'calc(100vh - 330px)',
      },
      spacing: {
        '72px': '72px',
        '4.5' : '1.125rem',
        '0.75' : '0.1875rem',
        '35vw': '35vw',
        '30vw': '30vw',
      },
      transitionDuration: {
        '1500': '1500ms',
      },
      minHeight: {
        '170': '170px',
      },
      screens: {
        'laptopL': '1441px',

      },
    },
  },
  plugins: [],
}
