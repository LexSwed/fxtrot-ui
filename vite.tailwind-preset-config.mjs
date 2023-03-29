import path from 'path';
import { defineConfig } from 'vite';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  publicDir: false,
  esbuild: {
    target: ['node'],
  },
  build: {
    minify: false,
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, './src/lib/tailwind/preset.mjs'),
      formats: ['cjs', 'esm'],
      fileName: (format) => {
        switch (format) {
          case 'esm':
            return `tailwind.preset.mjs`;
          case 'cjs':
            return `tailwind.preset.${format}`;
          default:
            return `tailwind.preset.js`;
        }
      },
    },
    rollupOptions: {
      external: ['tailwindcss/plugin', 'tailwindcss/defaultTheme'],
    },
  },
});
