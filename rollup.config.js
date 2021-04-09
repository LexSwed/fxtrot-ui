import esbuild from 'rollup-plugin-esbuild';

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
  return [
    createConfig({
      file: 'dist/index.esm.js',
      format: 'esm',
    }),
    createConfig({
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
    }),
  ];
}
