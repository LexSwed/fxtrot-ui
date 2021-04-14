import esbuild from 'rollup-plugin-esbuild';
import pkg from './package.json';

function createConfig(output) {
  return {
    input: 'src/lib/index.ts',
    output,
    external: ['react', 'react-dom', '@heroicons/react'],
    plugins: [
      esbuild({
        tsconfig: 'tsconfig.lib.json',
        target: 'node12',
        minify: true,
      }),
    ],
  };
}

export default function config(args) {
  if (args.watch) {
    return createConfig({
      file: pkg.module,
      format: 'esm',
    })
  }
  return [
    createConfig({
      file: pkg.module,
      format: 'esm',
    }),
    createConfig({
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
    }),
  ];
}
