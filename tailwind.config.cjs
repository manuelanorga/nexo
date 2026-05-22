/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0B1F3A',
        navy2: '#0E2D52',
        cobalt: '#0E4D92',
        teal: '#00C2A8',
        teal2: '#00A891',
        muted: '#6B8BAE',
        offwhite: '#F0F7FF',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
