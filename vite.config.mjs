import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import pkg from './package.json';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  publicDir: false,
  plugins: [react()],
  esbuild: {
    target: ['chrome105', 'safari16'],
  },
  build: {
    minify: false,
    target: 'esnext',
    lib: {
      entry: { lib: path.resolve(__dirname, './src/lib/index.ts') },
      name: pkg.name,
      formats: ['cjs', 'es'],
      fileName: (format) => {
        switch (format) {
          case 'cjs':
            return `fxtrot-ui.${format}`;
          case 'es':
            return `fxtrot-ui.mjs`;
          default:
            return `fxtrot-ui.${format}.js`;
        }
      },
    },
    rollupOptions: {
      external: Object.keys(pkg.peerDependencies),
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
