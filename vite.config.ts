import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index'),
      name: 'fxtrot-ui',
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@heroicons/react'],
      //   output: {
      //     globals: {
      //         react: 'React',
      //         'react-dom': 'ReactDOM',
      //     },
      //   },
    },
  },
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        module: 'esnext',
        target: 'esnext',
        declaration: true,
        strictFunctionTypes: true,
      } as any,
    },
  },
});
