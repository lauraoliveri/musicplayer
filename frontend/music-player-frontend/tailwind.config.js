/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,ts,scss}"],
  theme: {
    extend: {
      colors: {
        primary: '#302b63'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

