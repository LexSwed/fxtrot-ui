module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    'tailwindcss': {},
    'postcss-preset-env': {
      stage: 3,
      features: { 'nesting-rules': false },
    },
    'autoprefixer': {},
  },
};
