/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pandaWhite: '#FDFBF9',
        pandaBlack: '#1f1f1f',
        pandaBlue: '#58B4DC',
        pandaRed: '#E75A4D',
        pandaGreen: '#A4D4AE', //for signup
        slateGray: '#6C757D', // for muted text or borders
        lightGray: '#E9ECEF', // for input fields, card backgrounds, etc.
      },
      backgroundImage: {
        'Logo': "url('logo_pillpanda_transp.png')",
        'bkLogo':"url('logo_pillpanda_transp_bk.png')"
      },
      dropShadow: {
          white: '0 0 12px rgba(255, 255, 255, 0.4)',
        },
    }
  },
  plugins: [],
}