/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,md,mdx}'],
  presets: [require('./src/lib/tailwind/preset.cjs')],
};
