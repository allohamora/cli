import { createRequire } from 'node:module';
import { defineConfig } from 'rolldown';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

export default defineConfig({
  input: pkg.input,
  tsconfig: 'tsconfig.build.json',
  output: {
    file: pkg.bin,
    banner: '#!/usr/bin/env node',
    sourcemap: true,
    format: 'cjs',
  },
  external: pkg.dependencies ? Object.keys(pkg.dependencies) : [],
});
