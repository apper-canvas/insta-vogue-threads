/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
colors: {
        primary: '#1e40af',      // Deep blue
        secondary: '#f1f5f9',    // Light blue-gray
        accent: '#3b82f6',       // Bright blue
        surface: '#ffffff',      // Clean white
        background: '#f8fafc',   // Very light blue-gray
      },
      animation: {
        'bounce-subtle': 'bounce-subtle 0.6s ease-out',
      },
      keyframes: {
        'bounce-subtle': {
          '0%, 20%, 53%, 80%, 100%': { transform: 'scale(1)' },
          '40%, 43%': { transform: 'scale(1.1)' },
        }
      },
    },
  },
  plugins: [],
}