module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    stroke: {
      gray: '#c4c4c4',
    },
    colors: {
      'primary-blue': '#0F4C81',
      'light-gray': '#c4c4c4',
      'light-blue': '#e7edf2',
      'link-water': '#c0ccdc',
      white: '#ffffff',
      red: '#ff0000',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
