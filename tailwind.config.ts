/* eslint-disable import/no-anonymous-default-export */
import fxtrotPreset from './src/lib/tailwind/preset';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,md,mdx}'],
  presets: [fxtrotPreset],
};
