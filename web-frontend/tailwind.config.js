/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#48B07D',
        secondary: '#2D6A4F',
        accent: '#4B5563',
        'background-light': '#F0F7F4',
        'background-dark': '#1B4332',
        'primary-hover': '#3D9969',
        'hero-bg': '#E8F3ED',
      },
      fontFamily: {
        display: ['Manrope', 'Noto Sans TC', 'sans-serif'],
        body: ['Manrope', 'Noto Sans TC', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
}

