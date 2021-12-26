import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import shebang from 'rollup-plugin-preserve-shebang';
import pkg from './package.json';

export default defineConfig({
  input: pkg.input,
  output: {
    file: pkg.bin,
    sourcemap: true,
    format: 'cjs',
  },
  external: pkg.dependencies ? Object.keys(pkg.dependencies) : [],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.build.json',
    }),
    commonjs(),
    json(),
    shebang(),
  ],
});
