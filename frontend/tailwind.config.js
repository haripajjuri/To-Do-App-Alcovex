/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        'lg':'0 1px 5px 1px rgb(0 0 0 / 0.1)'
      }
    },
  },
  plugins: [],
}

