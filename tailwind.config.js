/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cricket-app red accent (was "gold" — kept the token name so every
        // component using bg-gold/text-gold/border-gold repoints automatically)
        gold: { DEFAULT: '#E10600', light: '#FF3B30', dark: '#B10000' },
        maroon: { DEFAULT: '#B10000', light: '#E10600', dark: '#8C0000' },
        // Full light-theme palette, deliberately using the SAME shade keys
        // (50-950) the whole app already references (bg-neutral-950 for page,
        // bg-neutral-900 for cards, text-neutral-100 for primary text, etc.)
        // — this flips every existing component to the light theme without
        // needing to touch each file's classes individually.
        neutral: {
          50: '#0a0a0a',
          100: '#171717',
          200: '#262626',
          300: '#404040',
          400: '#525252',
          500: '#737373',
          600: '#a3a3a3',
          700: '#d4d4d4',
          800: '#e5e5e5',
          900: '#f5f5f5',
          950: '#fafafa'
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        stadium: "linear-gradient(180deg, rgba(225,6,0,0.82), rgba(139,0,0,0.92)), url('/stadium-bg.jpg')"
      }
    }
  },
  plugins: []
};
