import pkg from './package.json' with { type: 'json' };
import { builtinModules } from 'node:module';
import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: { cli: './src/index.ts' },
  outDir: './bin',
  format: 'esm',
  sourcemap: true,
  banner: () => '#!/usr/bin/env node',
  deps: {
    neverBundle: [/^node:/, ...builtinModules, ...Object.keys(pkg.dependencies ?? {})],
  },
  clean: true,
});
