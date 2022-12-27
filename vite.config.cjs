const path = require('path');
const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const { viteStaticCopy } = require('vite-plugin-static-copy');
const pkg = require('./package.json');

/** @type {import('vite').UserConfig} */
module.exports = defineConfig({
  publicDir: false,
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, './src/lib/tailwind.preset.cjs'),
          dest: path.resolve(__dirname, './dist'),
        },
      ],
    }),
  ],
  esbuild: {
    target: ['chrome105', 'safari16'],
  },
  build: {
    minify: false,
    target: 'esnext',
    lib: {
      entry: path.resolve(__dirname, './src/lib/index.ts'),
      name: pkg.name,
      formats: ['cjs', 'es'],
      fileName: (format) => `fxtrot-ui.${format}.js`,
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
