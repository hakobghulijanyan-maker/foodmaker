/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm green primary
        primary: {
          50: '#f1f8f4',
          100: '#dcebe0',
          200: '#bbd7c4',
          300: '#8fbc9d',
          400: '#5d9b73',
          500: '#3d7d56',
          600: '#2c6442',
          700: '#234f35',
          800: '#1d3f2c',
          900: '#163322',
        },
        // Warm orange accent
        accent: {
          50: '#fff6ed',
          100: '#ffe9d4',
          200: '#ffcea8',
          300: '#ffac70',
          400: '#ff8438',
          500: '#fe6a16',
          600: '#ef4e08',
          700: '#c73808',
          800: '#9e2d0e',
          900: '#7f2710',
        },
        // Cream / off-white secondary
        cream: {
          50: '#fdfcf9',
          100: '#faf6ee',
          200: '#f3ebda',
          300: '#ebdcc0',
          400: '#ddc59a',
          500: '#cca972',
        },
        // Dark charcoal text
        ink: {
          50: '#f6f6f5',
          100: '#e7e7e5',
          200: '#d0d0cd',
          300: '#a8a8a3',
          400: '#7a7a73',
          500: '#56564f',
          600: '#3f3f39',
          700: '#2d2d28',
          800: '#1f1f1b',
          900: '#131311',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(35, 79, 53, 0.06), 0 8px 24px -8px rgba(35, 79, 53, 0.08)',
        card: '0 1px 3px rgba(35, 79, 53, 0.04), 0 10px 30px -12px rgba(35, 79, 53, 0.12)',
        lift: '0 4px 12px -2px rgba(35, 79, 53, 0.10), 0 20px 40px -12px rgba(35, 79, 53, 0.18)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pop': {
          '0%': { transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'pop': 'pop 0.3s ease-out',
        'spin-slow': 'spin-slow 1.2s linear infinite',
      },
    },
  },
  plugins: [],
};
