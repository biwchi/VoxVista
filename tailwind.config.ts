/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          '100': '#d9eeff',
          '200': '#bce3ff',
          '300': '#8ed2ff',
          '400': '#59b7ff',
          '500': '#409eff',
          '600': '#1b78f5',
          '700': '#1461e1',
          '800': '#174eb6',
          '900': '#19448f',
          '950': '#142b57',
          '50': '#eef8ff',
        },
      },
    },
  },
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  plugins: [],
}