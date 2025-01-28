/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist'],
        mono: ['GeistMono'],
      },
      colors: {
        mint: {
          50: '#F5FFFC',
          100: '#EBFFFA',
          200: '#D6FFF4',
          300: '#C2FFEF',
          400: '#ADFFE9',
          500: '#99FFE4',
          600: '#47FFCE',
          700: '#00F5B4',
          800: '#00A378',
          900: '#00523C',
          950: '#00291E',
        },
        cynder: {
          50: '#FEFAF6',
          100: '#FDF4EC',
          200: '#FCE9D9',
          300: '#FADFC7',
          400: '#F9D4B4',
          500: '#F7C9A0',
          600: '#F19E56',
          700: '#E27413',
          800: '#974D0D',
          900: '#4B2706',
          950: '#261303',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
};
