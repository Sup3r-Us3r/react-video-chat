/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      sans: 'Roboto, sans-serif'
    },

    extend: {
      backgroundImage: {
        hero: 'url(/hero.jpg)'
      },

      keyframes: {
        fade: {
          '0%': {
            opacity: 0
          },
          '100%': {
            opacity: 1
          }
        },

        fadeIn: {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: 0
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1
          }
        }
      },

      animation: {
        fade: 'fade 1s ease-in-out',
        'fade-in': 'fadeIn 0.5s ease-in-out'
      }
    }
  },
  plugins: []
};
