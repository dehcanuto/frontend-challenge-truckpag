/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: { 
    extend: {
      colors: {
        success: {
          DEFAULT: '#00c9a7',
          900: '#00c9a714',
        },
        warning: '#fae65c',
        error: {
          DEFAULT: '#fa5c7c',
          900: '#c4425d',
        },
      }
    }
  },
  plugins: [],
}
