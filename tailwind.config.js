/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/index.template.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // #F7931E : accent de marque. "dark" sert au texte orange sur fond clair (contraste AA).
        accent: { DEFAULT: '#F7931E', dark: '#B45309', soft: '#FFF4E5' },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
