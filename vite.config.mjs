import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import pkg from './package.json';

const makeExternalPredicate = (externalArr) => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
  return (id) => pattern.test(id);
};

/** @type {import('vite').UserConfig} */
export default defineConfig({
  publicDir: false,
  emptyOutDir: true,
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
      fileName: (format, entryName) => {
        switch (format) {
          case 'cjs':
            return `cjs/${entryName}.cjs`;
          case 'es':
            return `esm/${entryName}.mjs`;
          default:
            return `${entryName}/${format}`;
        }
      },
    },
    rollupOptions: {
      // external: [/node_modules/],
      external: makeExternalPredicate([
        // Handles both dependencies and peer dependencies so we don't have to manually maintain a list
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
      ]),
      output: {
        chunkFileNames: '[name].[format]',
        exports: 'named',
        preserveModulesRoot: 'src/lib',
        preserveModules: true,
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
