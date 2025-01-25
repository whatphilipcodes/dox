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
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
};
