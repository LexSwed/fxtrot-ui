const path = require('path');
const { defineConfig } = require('vite');

/** @type {import('vite').UserConfig} */
module.exports = defineConfig({
  publicDir: false,
  esbuild: {
    target: ['node'],
  },
  build: {
    minify: false,
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, './src/lib/tailwind/preset.cjs'),
      formats: ['cjs'],
      fileName: () => `tailwind.preset.cjs`,
    },
    rollupOptions: {
      external: ['tailwindcss/plugin', 'tailwindcss/defaultTheme'],
    },
  },
});
