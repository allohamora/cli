import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

export default defineConfig({
  input: pkg.input,
  output: {
    file: pkg.bin,
    banner: '#!/usr/bin/env node',
    sourcemap: true,
    format: 'commonjs',
  },
  external: pkg.dependencies ? Object.keys(pkg.dependencies) : [],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.build.json',
    }),
    commonjs(),
  ],
});
