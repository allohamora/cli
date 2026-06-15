import { presetState } from '#__tests__/setup-test-context.ts';
import { getPrettierPreset } from '#src/categories/js/prettier/preset/index.ts';
import { describe, expect, it } from 'vitest';

describe('prettier/preset', () => {
  it('returns the default prettier config for every js variant', () => {
    for (const variant of ['default', 'node:ts', 'react:ts'] as const) {
      presetState.setJsPreset(variant);

      expect(getPrettierPreset()).toEqual({
        config: {
          semi: true,
          trailingComma: 'all',
          singleQuote: true,
          printWidth: 120,
          tabWidth: 2,
        },
        ignore: ['dist', 'node_modules', 'public', '.husky', 'package-lock.json', 'coverage'],
        scripts: [
          { name: 'format', script: 'prettier . --check' },
          { name: 'format:fix', script: 'prettier --write .' },
        ],
      });
    }
  });
});
