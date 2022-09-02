const path = require('path');
const { defineConfig } = require('vite');
const pkg = require('./package.json');

module.exports = defineConfig({
  publicDir: false,
  esbuild: {
    target: ['chrome105', 'safari16'],
  },
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: pkg.name,
      fileName: (format) => `fxtrot-ui.${format}.js`,
    },
    rollupOptions: {
      external: Object.keys(pkg.peerDependencies),
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          '@stitches/react': 'stitches',
        },
      },
    },
  },
});
