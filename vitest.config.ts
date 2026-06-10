import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
      __tests__: resolve(__dirname, '__tests__'),
    },
  },
  test: {
    environment: 'node',
    globals: true,
    include: ['**/*.spec.ts'],
    passWithNoTests: true,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
    },
  },
});
