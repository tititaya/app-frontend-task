/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Active le mode sombre basé sur une classe
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Chemin vers les fichiers React
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6', // Exemple de couleur personnalisée
        secondary: '#64748b',
      },
    },
  },
  plugins: [],
};
