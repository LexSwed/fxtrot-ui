import path from 'path';
import esbuild from 'rollup-plugin-esbuild';

const { root } = path.parse(process.cwd());

function external(id) {
  return !id.startsWith('.') && !id.startsWith(root);
}

function createConfig(output) {
  return {
    input: 'src/lib/index.ts',
    output,
    external,
    plugins: [
      esbuild({
        tsconfig: 'tsconfig.lib.json',
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
