import { createRequire } from 'node:module';
import { builtinModules } from 'node:module';
import { defineConfig } from 'rolldown';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

export default defineConfig({
  input: pkg.input,
  output: {
    file: pkg.bin,
    banner: '#!/usr/bin/env node',
    sourcemap: true,
    format: 'esm',
  },
  external: [/^node:/, ...builtinModules, ...Object.keys(pkg.dependencies ?? {})],
});
